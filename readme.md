# NOAH'S TINY HELPER

## Before you start ... 

1. Open up the terminal by going to `Macintosh HD > Applications > Utilities > Terminal.app` 
2. Say to yourself, "let's hack into the mainframe"
3. Sign up for a free [github account](https://github.com/) 
4. Follow the instructions [here](https://docs.github.com/en/get-started/quickstart/set-up-git#setting-up-git) to log into github from your terminal. You will only have to do this once, not every time you open the terminal.
5. If something goes wrong, just quit the terminal app and open it up again 

## Installing this project

By now you should have a github account configured with your terminal, and your terminal should be open. 

Now, to install the project, paste this command into your terminal and hit enter:

```sh
git clone https://github.com/kaylakantola/noahs-tiny-helper.git
```

This will pull down this project from github onto your own machine. 

It will put the project in a folder at the root of your mac, so, you should see the folder at `Macintosh HD > noahs-tiny-helper`.

Navigate into that directory via the terminal by typing:

```sh
cd noahs-tiny-helper
```

Finally, run this command to install external packages (its ok if you dont know what that means):

```sh
npm install
```

These steps are all one-time steps. If something goes wrong, though, you can just delete the `noahs-tiny-helper` folder and start over from the `git clone` step.

Don't close your terminal after this step! Proceed to the "running this project" step.

> Important! If you ever have to close and re-open the terminal after this step, make sure that when you open the terminal back up, you run `cd noahs-tiny-helper` to make sure you are in the right folder.

## Running this project

Open up your finder and navigate to `Macintosh HD > noahs-tiny-helper`, if you haven't already.

You should see a folder in there called `input`. Copy all the files that you want to transform over into that input folder. I **STRONGLY** recommend copy/pasting them over and not just moving your only actual files into this folder. That way you can delete everything in there and go in batches if you want, without worrying about losing data by accident.

Then, from your terminal, run this command:

```npm start```

It should take a second or two, and then the terminal should spit out a message like this:

`Done! Find your results in: ./output/1641770051443`

That number at the end is "unix time", or, [the exact number of seconds since January 1 1970.](https://en.wikipedia.org/wiki/Unix_time) I know, it's weird, but it's a great way to make it so that every time you run the command, the output is written to a different folder and doesn't overwrite existing results.

Open up your finder again and navigate to `Macintosh HD > noahs-tiny-helper > output > 1641770051443` to see your transformed results! (make sure to look for whatever number your terminal gave you, instead of `1641770051443`).

## Further reading for fun and friendship

- https://www.imore.com/how-use-terminal-mac-when-you-have-no-idea-where-start
- https://www.makeuseof.com/tag/beginners-guide-mac-terminal/
- https://www.maketecheasier.com/macos-terminal-beginners-guide/
