# Agentic Sub-Task Orchestration Protocol

This workspace leverages an autonomous agent orchestration paradigm. Rather than executing manual GUI or line-by-line CLI operations for menial, repetitive, or strictly computational tasks, the primary Intelligence (Gemini Pro) spawns autonomous, specialized worker scripts.

## Core Concepts

1. **Primary Intelligence (Orchestrator)**: Focuses on architecture, UX/UI strategy, component refactoring, and complex cross-file abstractions.
2. **Worker Agents (Sub-Agents)**: Lightweight Python, Bash, or Node.js scripts generated on the fly to handle data munging, batch processing, scraping, and asset extraction.

## Current Worker Deployments

- **Worker 1 (`extract_images.py`)**: Deployed to autonomously parse the `zipline sf bitch Portfolio may 10.pdf` binary, identify high-resolution image streams embedded in the PDF pages, and extract them into the web app's `public/portfolio-assets` directory. 

## Workflow Integration
Once workers complete their autonomous execution, the Orchestrator reads the output state (e.g., the directory listing of the newly extracted images) and synthesizes the final application state by wiring up the dynamic assets in the front-end components.
