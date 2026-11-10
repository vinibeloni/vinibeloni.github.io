---
title: Active Directory integration for identity governance
date: 2025-03-01
role: Tech Lead
company: Niuco
period: Feb 2025 – Nov 2026
---

I built the end-to-end Active Directory integration for the identity governance and administration (IGA) platform, with a focus on security.

## Context

The client had two problems. The first was identity governance (IGA): they needed to manage users and groups securely, creating, updating and revoking access during onboarding and offboarding, and moving people between groups. The second was SaaS management: costs were not visible and nobody knew exactly how many users there were.

## How it went

The high-level architecture was defined by the CTO. At the time I had only recently joined the company and didn't yet know the whole ecosystem. Even so, I was actively involved in building it: I did the technical refinement, broke the work into tasks and built the integration. I was also responsible for the delivery to the client and took part in the implementation meeting.

The agent is a C# Windows Service that runs on the client's network, integrated with Active Directory. Since our platform had no inbound access to that network, the flow was inverted: the client's machine called an authenticated endpoint of ours, which returned the tasks to run. A scheduled routine inside the service sent users and groups to the platform, where attributes were mapped.

Security drove the decisions. When connecting the integration through the platform, the user received a unique secret, stored in AWS Secrets Manager and used by the service to authenticate. On the client's machine, the configuration file was encrypted with Windows DPAPI.

## Challenges

The first was infrastructure: spinning up EC2 instances, configuring the AD server and the agent machine, and keeping the environment as close as possible to the client's.

The second was understanding the AD integration error codes. A lot of it was trial and error, until I found an article that explained exactly how to do this integration.

The third was observability. The service runs on the client's computer, so I didn't have the visibility of a service in our own cloud. That's why I also set up alerts for when we stopped receiving the agent's "ping". That made it easy to spot when it had stopped and to warn the client proactively.

## Results

- The company's first end-to-end IGA project.
- The client praised the work done by the CTO and me, which weighed in the contract renewal.

## What I learned

I learned a lot about security, auditing and monitoring services that run outside our own infrastructure, where you can't just open a log.
