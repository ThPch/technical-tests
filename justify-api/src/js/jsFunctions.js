/**====================================*\
 *  PURE JAVASCRIPT FUNCTIONS
 ======================================*/

/**
* countWords() return the number of words in a string
* @param { String } str is the text sent to the API
*/
const countWords = (str) => {
    if(str.length > 1)
    {
        str = str.replace(/(^\s*)|(\s*$)/gi,"");
        str = str.replace(/[ ]{2,}/gi," ");
        str = str.replace(/\n /,"\n");
        return str.split(' ').length;
    }
    else{
        return "Il n'y a rien à justifier !";
    }
}

/**
* justifyStr() is a function that justify a text with a width
* @param { String } str is the text
* @param { Integer } len=80 value default at 80, is the max chars per line
*/
const justifyStr = (str, len = 80) => {
    //Check is there is a text to justify
    if ((str.length > 1) && (Math.sign(len))) {

        const re = RegExp("(?:\\s|^)(.{1," + len + "})(?=\\s|$)", "g");
        const res = [];
        const finalResult = [];
        let m;

        //Splitting the text in the res[]
        while ((m = re.exec(str)) !== null) {
            res.push(m[1]);
        }

        //Loop
        for (let i = 0; i < res.length - 1; i++) {

            //If there is one blank space
            if (res[i].indexOf(' ') != -1) {
                for (let j = 0; j < res[i].length - 1; j++) {
                    if (res[i][j] == ' ') {

                        //When the line is at len value (80 by default), we're stopping and going to the next iteration of the for loop
                        if(res[i].length == len)
                        {
                            break;
                        }

                        //Putting some blank space to justifying
                        res[i] = res[i].substring(0, j) + " " + res[i].substring(j);

                        //When the line is at len value (80 by default), we're stopping and going to the next iteration of the for loop
                        if (res[i].length == len){
                            break;
                        }
                        while (res[i][j] == ' '){
                            j++;
                        }
                    }
                }
            }
            //Concat the new lines justified at width (len by default is at 80)
            finalResult.push(res[i]); 
        }
        finalResult.push(res[res.length - 1]);
        return finalResult.join('\n');
    } else {
        return "Pas de texte à justifier"
    }
}

  
module.exports = {
    countWords,
    justifyStr,
}
