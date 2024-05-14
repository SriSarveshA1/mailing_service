<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">MAILING_SERVICE</h1>
</p>
<p align="center">
    <em>HTTP error 401 for prompt `slogan`</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/SriSarveshA1/mailing_service?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/SriSarveshA1/mailing_service?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/SriSarveshA1/mailing_service?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/SriSarveshA1/mailing_service?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
  <img alt="Static Badge" src="https://img.shields.io/badge/google-gemini-icon">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/PM2-2B037A.svg?style=flat&logo=PM2&logoColor=white" alt="PM2">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>
<hr>

##  Overview

It is a tool designed to streamline the process of managing and responding to emails by generating automated responses. Built with efficiency and customization in mind, this tool leverages advanced natural language processing (NLP) techniques to understand the context and intent of incoming emails, enabling it to craft relevant replies.

---

##  Features

1. OAuth Integration: Integrates OAuth access to Gmail for secure email access.
2. Email Context Analysis: Utilizes Gemini's API to understand the context of incoming emails and assign automatic labels (Interested, Not Interested, More Information).
3. Automated Replies: Generates and sends automated replies based on email context using Gemini's API.
4. Task Scheduling: Implements BullMQ as the job scheduler for an efficient email-sending process using a queue.

---

##  Repository Structure

```sh
└── mailing_service/
    ├── index.ts
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── jobs
    │   │   ├── consumer.ts
    │   │   └── producer.ts
    │   ├── modules
    │   │   ├── common
    │   │   │   ├── axiosUtils.ts
    │   │   │   ├── commonUtils.ts
    │   │   │   ├── constants.ts
    │   │   │   ├── geminiUtils.ts
    │   │   │   └── redisUtils.ts
    │   │   └── gmail
    │   │       ├── gmail.api.ts
    │   │       ├── gmail.provider.ts
    │   │       ├── googleAuthUtils.ts
    │   │       └── middleware
    │   │           └── oAuthMiddleware.ts
    │   └── types.ts
    └── tsconfig.json
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                               | Summary                                       |
| ---                                                                                                | ---                                           |
| [tsconfig.json](https://github.com/SriSarveshA1/mailing_service/blob/master/tsconfig.json)         | Specifies the root files and the compiler options required to compile a TypeScript project.     |
| [package.json](https://github.com/SriSarveshA1/mailing_service/blob/master/package.json)           | Specifies metadata, dependencies, scripts, and configurations required for the project.     |
| [index.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/index.ts)                   | It is the entry point of our express application |
| [package-lock.json](https://github.com/SriSarveshA1/mailing_service/blob/master/package-lock.json) | It contains installations of project dependencies by locking down their versions and maintaining a snapshot of the entire dependency tree.|

</details>

<details closed><summary>src</summary>

| File                                                                                 | Summary                                  |
| ---                                                                                  | ---                                      |
| [types.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/types.ts) | It contains the common types that are used across the application. |

</details>

<details closed><summary>src.jobs</summary>

| File                                                                                            | Summary                                          |
| ---                                                                                             | ---                                              |
| [consumer.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/jobs/consumer.ts) | It contains the functions that process the jobs from the queue. |
| [producer.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/jobs/producer.ts) | It contains the functions that add jobs to the queue. |

</details>

<details closed><summary>src.modules.gmail</summary>

| File                                                                                                                   | Summary                                                          |
| ---                                                                                                                    | ---                                                              |
| [gmail.api.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/modules/gmail/gmail.api.ts)             | It contains all the api routes that are part of the core functionalities      |
| [googleAuthUtils.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/modules/gmail/googleAuthUtils.ts) | It contain the util function required during the Auth process |
| [gmail.provider.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/modules/gmail/gmail.provider.ts)   | It contains the business logic for all the apis.  |

</details>

<details closed><summary>src.modules.gmail.middleware</summary>

| File                                                                                                                              | Summary                                                                     |
| ---                                                                                                                               | ---                                                                         |
| [oAuthMiddleware.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/modules/gmail/middleware/oAuthMiddleware.ts) | It contains all the authentication-related middleware that we can use before executing the providers |

</details>

<details closed><summary>src.modules.common</summary>

| File                                                                                                            | Summary                                                       |
| ---                                                                                                             | ---                                                           |
| [redisUtils.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/modules/common/redisUtils.ts)   | It contains the redis initialization and other utils. |
| [axiosUtils.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/modules/common/axiosUtils.ts)   | It contains the util methods to perform api calls using axios. |
| [constants.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/modules/common/constants.ts)     | It contains the constants strings that we use across the application   |
| [commonUtils.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/modules/common/commonUtils.ts) | It contains all the common util functions that we use across the application |
| [geminiUtils.ts](https://github.com/SriSarveshA1/mailing_service/blob/master/src/modules/common/geminiUtils.ts) | It contains all the utils used for interacting gemini ai.  |

</details>

---

##  Getting Started

###  Installation

1. Clone the mailing_service repository:

```sh
git clone https://github.com/SriSarveshA1/mailing_service
```

2. Change to the project directory:

```sh
cd mailing_service
```

3. Install the dependencies:

```sh
npm install 
```

###  Running mailing_service

Use the following command to run mailing_service:

1. Execute this command to compile the typescript files and start the express server.
```sh
npm start
```

2. Execute this command to start the worker in another terminal.
```sh
npm run worker
```

##  Acknowledgments

- Click [here](https://drive.google.com/file/d/1KXIvHk3ez-PQsdCa7tWo3yd0XuwRAD-t/view?usp=sharing) to access the Postman collection.
---
