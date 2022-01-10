const es = require('event-stream')
const fs = require('fs');
const fse = require('fs-extra')
const {startsWith, replace} = require('ramda')

// 3c. definition of lineFilter function
// this gets run on each line of each .txt file that the program reads
function lineFilter(line) {
    const startsWithTab = startsWith("\t", line) // does the line start with a tab?
    const isFrameSeconds = line === '\tFrame\tseconds' // is the line the Frame seconds line?
    const isntUselessHeader = !line.includes('Units') && !line.includes('Source') && !line.includes('Aspect Ratio') // is the line one of the headers that you want to strip out?
    const isNumber = typeof parseInt(line) === 'number' // is the line a number?

    // if the line starts with a tab, is the Frame seconds line, isn't one of the headers OR is a number, then we want to keep it.
    const lineIsOk = startsWithTab && isntUselessHeader && (isFrameSeconds || isNumber)
    return lineIsOk
}

// 3d. definition of lineEditor function
function lineEditor(line) {
    const edited = replace('\t', '', line) // remove the first tab in the line
    return edited
}

// 3. This is the definition of the readAndWriteFile function!
function readAndWriteFile({inputPath, outputPath}){
    // 3a. first we create a read stream.
    // Basically this means the program will read each file one chunk at a time until it's done
    return fs.createReadStream(inputPath)
        .pipe(es.split(/(\r?\n)/)) // 3b. we tell the stream to split it into chunks on every line break
        .pipe(es.filterSync(lineFilter)) // 3c. we filter out lines that are irrelevant using the filter function defined above
        .pipe(es.mapSync(lineEditor)) // 3d. we transform the remaining lines using the lineEditor function defined above
        .pipe(es.join("\r\n")) // 3e. we then rejoin all the chunks this way to preserve the line breaks
        .pipe(fs.createWriteStream(outputPath)) // 3f. finally we write the results of the stream to the output path we defined earlier
        .on('error', function (err) {
            // if an error happens, we print it to the terminal so you can see what went wrong
            console.log('Error while reading file.', err);
        })
        .on('end', function () {
            // when it's done, print out to the terminal
            console.log(`Completed: ${inputPath} -> ${outputPath}`);
        })
}


// 2. This is definition the main function!
// there's nothing special about the word "main", it's just a common convention
function main() {

    // 2a. first we create the folder inside the output folder where we'll dump the files
    const date = Date.now() // the exact # of seconds since Jan 1 1970
    fse.ensureDir(`./output/${date}`); // creates the new folder

    // 2b. then, we read the name of all the files in the input folder
    fs.readdir("./input", (err, files) => {

        // 2c. for each file name, we do the following...
        return files.forEach(file => {
            // 2d. create some variables to represent the input and output paths including the updated file name
            const inputPath = `./input/${file}`
            const oldFileName = file.split(".")[0]
            const outputPath = `${outputDir}/${oldFileName}_for-c4d.txt`
            // 2e. invoke the 'readAndWriteFile' function, passing it the paths as arguments
            return readAndWriteFile({inputPath, outputPath})
        })
    })
    console.log(`Done! Find your results in: ${outputDir}`)
}

// 1. When you run "npm start", the only thing that happens is this function, "main", gets called (i.e. invoked)
main()
