# Typescript-Discord.js-v14-Template with yarn!

A quick-start template for Discord.js v14 in Typescript with yarn that contains handling for commands, events, and interactions!

> This project is a frok of [TSLARoadster/TypeScript-Discord.js-v14-Template](https://github.com/TSLARoadster/TypeScript-Discord.js-v14-Template)

## Installation

1. Clone this project with
   ```bash
   $git clone https://github.com/ry2x/TypeScript-Discord.js-v.14-yarn-template.git
   ```
2. Install dependencies with
   ```bash
   $yarn install
   $yarn
   ```
3. Install hasky [[?]](https://www.npmjs.com/package/husky)_What is hasky_
   ```bash
   $yarn run prepare
   ```

## Configuration
1. Edit `./src/RENAME.env`


   You'll need `client_id`, `TOKEN` and `guild_id`  [[?]](https://discord.com/developers/applications) _You can get them at [here](https://discord.com/developers/applications)._

2. Rename `RENAME.env` to `.env`
3. Edit `./src/config.json`
   
   Chnage "!" to configure your prefix
   ```json
   {
    "prefix": "!"  
   }
   ```
## Scripts
> Check lint
 ```bash
$yarn run lint
```
> Format
```bash
$yarn run prettier
```
> test (without compile)
```bash
$yarn run test
```
> compile files
```bash
$yarn run build
```
> run compiled files
```bash
$yarn run start
```
