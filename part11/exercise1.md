# Python Project

By writing in Python, you can skip the building part since Python is an interpreted language.

## Linting

The first step is, of course, linting. Python has a library **_flake8_**, which followed the PEP8 standards (Python practices standards). But there is one small problem, unlike ESLint with fixable problems, flake8 only shows you where the issues are so everything must be done manually.

That is why we are going to use an additional library: **_black_**, which does not follow PEP8 entirely but it does clean up your code automatically.

## Testing

The most popular library for writing unit tests for Python is **_pytest_**.

## CI

Alternatives can be:

- CircleCI.
- Azure Pipelines.
- Gitlab CI.
- Trello.

## Self-hosted or Cloud-based

### Self-hosted

#### Pros

- Better security.
- Flexible.
- Easier to integrate.

#### Cons

- Harder to scale (to scale up you need better hardware).
- Backups are required.

### Cloud-based

#### Pros

- No need for infrastructure.
- Storage can be added easily.
- Regular backup plans.

#### Cons

- Internet dependent.
- Easier to be hacked.

To choose which one we should use, we need to answer these questions:

1. Budget for the project.
2. Scale of the project.
3. Do we need consistent uptime?
