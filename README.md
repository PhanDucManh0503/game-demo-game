## Welcome to ERP!

ERP is platform to help management elderly people based on Korean. This document help you know source code structure and how to use it in development.

## Environment development

Visual Studio Code IDE
NodeJS >= v16
NextJS v13

## How to run locally

1. Clone the project

```bash
  git clone https://github.com/realone-thedreamERP/ERP_FE_VN_GIT.git
```

2. Go to the project directory

```bash
  cd ERP_FE_VN_GIT
```

3. Install dependencies

```bash
  yarn
```

4. Create the ".env" folder, and paste all key into this file. Because it should be security, so we shouldn't push this file to github.

5. Run

```bash
 yarn dev
```

## How to build

1. Git pull source code to your PC
2. Open with your IDE
3. Run cmd: yarn build

## How to deploy

Waiting....

## Source code structure

1. public: folder containing public elements, for example, images, videos, ...,
2. src:
   2.1. app: main pages.
   2.2. components: components are reused for pages.
   2.3. configs: setting for our project, such as axios, cookie, ...
   2.4. hooks:
   2.5. locales:
   2.6. providers:
   2.7. stores: manage application global variables.
   2.8. styles: global style css for our project.
   2.9: utils: manage constant variables for our project.

## How to switch environment

Waiting....

## How to switch branch.

```bash
 git checkout branch_name
```

Ex: git checkout develop
