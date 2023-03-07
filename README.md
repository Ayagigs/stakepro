# Stakepro

## 🛠 Rcommended Tools

##### <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png" alt="git" width="30" height="30"/> `Visual studio code` 

##### <img src="https://camo.githubusercontent.com/93b32389bf746009ca2370de7fe06c3b5146f4c99d99df65994f9ced0ba41685/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f676574706f73746d616e2f676574706f73746d616e2d69636f6e2e737667" alt="git" width="30" height="30"/>  `Postman`

## ⚠️ Warning
DO NOT MERGE YOUR `pull request`

DO NOT WORK ON PRODUCTION OR DEVELOPMENT `branch`

## 🗒 Note
Repeat the steps below from 2 - 4 `on how to get started with the project` below for a `new task`

Repeat the steps below from 3-4 `on how to get started with the project` for any `update`




## 🚀 Steps on how to get started with the Project

### 1. Clone the repository `Stakepro`
First you need to have a copy of the project in your local machine.

On your local machine open your command prompt if you are using a windows operating system or terminal on a MacOs

Specify the path inwhich you want to clone the project into on your terminal or comand prompt</p>

Once you are in the folder where you want the project to be then copy the git command below to clone the project
 
``` 
git clone --branch DEVELOPMENT https://github.com/Ayagigs/stakepro.git
```

After cloning the project the will be a new folder added on your local computer with the reopsitory name, you can now open the folder in your IDE `Visual Studio code` 

We still need to install the required modules or denpendcies for our project. So to do that you need to open the terminal in your IDE `Visual Studio code` and run the command below

``` 
npm install 
```

Once that's done another folder will be added to the project folder named `node_modules` 

you can now start the server by running the command below in your terminal or command prompt

``` 
npm run dev 
```

### 2. Create a branch 
To get started with the task assigned to you, create a new branch and the name should be descriptive based on the task assigned 

Run the code below to create a new branch

```
git checkout -b <related task name>
```

Then verify the current branch you are on with the command below

```
git branch
```

After you run the command the current branch you are on will be displayed


### 3. Add and Commit
Once done with a portion of you task or the whole task and you confirm that everything is working fine
run the command below

```
  git add .
  git commit -m "<commit message>"
```


### 4. Submitting and Pull request
Now go to the Github Repo page. You should see the branch you pushed up in a yellow bar at the top of the page with a button to “Compare & pull request”.

Click “Compare & pull request”. This will take you to the “Open a pull request” page. From here, you should write a brief description of what you actually changed. And you should click the “Reviewers” tab and select whoever our team decided would be the “Merge Master”. When you’re done, click “Create pull request”.
