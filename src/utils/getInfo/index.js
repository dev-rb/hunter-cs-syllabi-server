var map = require('../map.json');
var fs = require('fs');
const path = require('path');

const coursesPath = path.resolve(__dirname, '../../data/courses/')

function getSyllabus(classId, index) {
    var fileTest = 'Nope';
    fs.readdirSync(coursesPath).forEach((folder) => {
        fs.readdirSync(path.join(coursesPath, folder)).forEach((file, fileIndex) => {

            if (folder.toString() === classId.toString() && fileIndex.toString() === index) {

                fileTest = (path.join(coursesPath, folder, file))
            }
        });
    });

    return fileTest;
}


function getInfo() {
    var courses = [];

    for (const [key, value] of Object.entries(map)) {
        // console.log(Object.entries(map[key]));
        var test = [];
        fs.readdirSync(coursesPath).forEach((folder, index) => {

            if (Object.keys(map[key]).includes(folder.replace('_', ' '))) {
                var syllabi = [];
                fs.readdirSync(path.join(coursesPath, folder)).forEach((file) => {
                    syllabi.push(file.toString())
                });
                test.push({ id: folder.replace('_', ' '), description: map[key][folder.replace('_', ' ')], syllabi: syllabi });
            }

        });
        courses.push({ type: key, classes: test });
    }

    return courses;
}

module.exports.getInfo = getInfo;
module.exports.getSyllabus = getSyllabus;
