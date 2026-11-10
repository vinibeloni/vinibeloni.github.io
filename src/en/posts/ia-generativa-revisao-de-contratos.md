---
title: Generative AI for automated contract registration
date: 2025-02-01
role: Tech Lead
company: Niuco
period: Feb 2025 – Nov 2026
---

I led the company's first generative AI product: a workflow built on Amazon Bedrock and specialized agents that automates the registration of software contracts on the platform, a process that used to be manual.

## Context

The project started for a strategic client. Every software contract had to be read and entered into the platform by hand, field by field. The goal was for AI to do that work, at a quality level we could trust.

## How it went

I designed the architecture, split and delegated the tasks, and also wrote code. The team was small: me and a junior developer.

The key decision was separating what is a job for code from what is a job for AI. Anything with a clear rule stayed in code, such as choosing which contract attachments go into the analysis. The model only handled what needs interpretation, such as identifying the payment type. That makes the output more predictable and keeps the prompt smaller.

## Challenges

The biggest challenge was refining the prompts until the answers were reliable.

I built a ground-truth set: contracts with the correct registration, already reviewed by people. By analyzing samples from it, I decided what to take away from the AI and move into code, and where the prompt needed work.

For every change to a prompt or to the code, I ran a script with a suite of automated tests against the ground truth, to check whether the change was a real gain or just looked better. Using Claude Code (Opus 5.5), I recorded the differences between runs and what to change in the next one. Every adjustment was measured, not decided by gut feeling.

## Results

- The company's first AI product, running in production.
- 1,700 contracts at launch for the strategic client.

## What I learned

I learned a lot about Amazon Bedrock and about managing the context that goes to the model: what to send, what to leave out, and what to solve beforehand in code.

I also learned that with AI, what makes it safe to iterate is having a ground truth and automated tests. Without them, every prompt change is a guess.

I wrote up these lessons in an internal article for the team.
