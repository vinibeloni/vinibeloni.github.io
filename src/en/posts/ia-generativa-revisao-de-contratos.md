---
title: Generative AI for automated contract registration
date: 2025-02-01
role: Tech Lead
company: Niuco
period: Feb 2025 – Nov 2026
---

I led the company's first generative AI product: a workflow built on Amazon Bedrock and specialized agents that takes reading attachments and notes off the analyst's plate when registering software contracts. The analyst still validates the result.

## Context

The project started for a strategic client. Every software contract had to be read and entered into the platform by hand, field by field. The goal was for AI to do the reading and filling in, and for the analyst only to review, at a quality level we could trust. It was a pilot, and the client knew that.

## How it went

I designed the architecture, split and delegated the tasks, and also wrote code. The team was small: me and a junior developer.

At the start, the product team showed me v1 of the Figma. Before planning, I questioned what had been presented and sliced the deliveries before development began. I also built a skill that sized the original spec and broke it down into smaller specs for GitHub's [Spec Kit](https://github.com/github/spec-kit), and then helped check the big picture.

Each slice went through about 10 refinement rounds, in a cycle of refine, prioritize, drop or build, and validate the delivery, before moving on to the next round. It took 2 months of work.

The key decision was separating what is a job for code from what is a job for AI. Anything with a clear rule stayed in code, such as choosing which contract attachments go into the analysis. The model only handled what needs interpretation, such as identifying the payment type. That makes the output more predictable and keeps the prompt smaller.

The workflow imports the contracts, with notes and attachments, and uses AI in three steps:

1. Find the supplier registered on the platform that matches the contract's issuer.
2. Find that supplier's product.
3. Fill in some of the registration fields.

The analyst no longer reads attachments and notes; they review the result instead. If the AI gets something wrong, they fix it.

To help the analyst prioritize what to look at, each registration has a confidence score. The score is computed by rules, such as an exact match on the supplier name, a product match and other comparisons. It doesn't come from the model itself, because the confidence an LLM states about its own answer is neither reliable nor auditable.

I also limited where the model can be wrong. All contracts from an issuer belong to the same supplier. Once the analyst confirms that supplier, it never changes again, not even for new contracts. The LLM's output becomes confirmed data, and the same mistake doesn't repeat. Product and fields vary more and still go through the model.

I also took care of observability: I set up metrics and alerts, and a budget limit in AWS itself, to keep model costs under control. The workflow also has audit logs.

## Challenges

The biggest challenge was refining the prompts until the answers were reliable.

I built a ground-truth set: contracts with the correct registration, already reviewed by people. By analyzing samples from it, I decided what to take away from the AI and move into code, and where the prompt needed work.

For every change to a prompt or to the code, I ran a script with a suite of automated tests against the ground truth, to check whether the change was a real gain or just looked better. Using Claude Code (Opus 5.5), I recorded the differences between runs and what to change in the next one. Every adjustment was measured, not decided by gut feeling.

## Trade-offs

- **Human in the loop instead of full automation:** safer for a pilot, but saves less time.
- **Rules in code, interpretation in the model:** more predictable output and a smaller prompt, but more code to maintain.
- **Rule-based score instead of the model's self-assessment:** reliable and auditable, but only covers what can be compared.
- **Automation bias:** over time, the reviewer tends to just approve. To mitigate it, we can measure the "approved with no changes" rate per score range, which also helps calibrate the score, and analyze which step is most expensive when it fails, to focus review there.

## Results

- The company's first AI product, running in production.
- Nearly 2,000 contracts at launch for the strategic client.
- Delivered the feature the client asked for most.

The goal was never for the AI to be 100% right. It's to make fewer mistakes than the manual process, and in a way we can detect.

## What I learned

I learned a lot about Amazon Bedrock and about managing the context that goes to the model: what to send, what to leave out, and what to solve beforehand in code.

I also learned that with AI, what makes it safe to iterate is having a ground truth and automated tests. Without them, every prompt change is a guess.

I wrote up these lessons in an internal article for the team.
