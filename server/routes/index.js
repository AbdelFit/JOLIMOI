const express = require('express');
const router = express.Router();

let romanNumber = "";
let oldRomanNumber = "";

// post
router.post('/getRoman', (req, res) => {
    if(req.body.decimalNumber) {
        const num = +req.body.decimalNumber;     // get decimal number from request
        let digits = String(num).split("");      // split number to an array
        const roman_symbols = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                            "","I","II","III","IV","V","VI","VII","VIII","IX"];    // roman symbols
        romanNumber = "";
        let i = 3;      // we only want 3 digits to convert (numbers between 1 and 100)

        /*
            take the last of the array and add it to i*10 and find its roman symbol in key
            example : 42 
                1 + 20 = 21 => roman_symbols[21] || '' => I => roman = I + '' = I
                undefined + 10 = undefined => roman_symbols[undefined] || '' => '' => roman = '' + I = I
                undefined + 0 = undefined => roman_symbols[undefined] || '' => '' => roman = '' + I = I
            result I

            example : 42 
                2 + 20 = 22 => roman_symbols[32] || '' => II => roman = II + '' = II
                4 + 10 = 14 => roman_symbols[14] || '' => XL => roman = XL + II = XLII
                undefined + 0 = undefined => roman_symbols[undefined] || '' => '' => roman = XLII + '' = XLII
            result XLII

            example : 100
                0 + 20 = 20 => roman_symbols[20] || ''  => ''   => roman = '' + '' = ''
                0 + 10 = 10 => roman_symbols[14] || ''  => ''   => roman = '' + '' = ''
                1 + 0 = 1   => roman_symbols[1] || ''   => C    => roman = C + '' = C
            result C
        */
        while (i--)
            romanNumber = (roman_symbols[+digits.pop() + (i * 10)] || "") + romanNumber;

        /* 
            49 et 99 could be written in 2 different ways :
                49 : XLIX or IL
                99 : XCIX or IC
            the best one is the second, it's more readable
        */
        romanNumber = num === 49 ? "IL" : num == 99 ? "IC" : romanNumber;

        res.status(200).send(JSON.stringify({'romanNumber': romanNumber}));
    }
    else {
        res.status(204).end();
    }
});


// sse
router.get('/sse', (req, res) => {
    // SSE Setup
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    res.write('\n');

    let data;
    
    // SSE Data
    setInterval(() => {
        /*
            if the decimal number has changed in the front we'll send it's roman number, if not we'll send 0
            this will help us prevent the error "err_incomplete_chunked_encoding"
        */
        data = oldRomanNumber !== romanNumber ? romanNumber : 0;
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 1000)
});

module.exports = router;