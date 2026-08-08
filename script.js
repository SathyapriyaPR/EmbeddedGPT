// ==========================================
// EmbeddedGPT - JavaScript
// Version 1.0
// ==========================================


// 1. Get the HTML elements

const button = document.getElementById("askButton");

const questionInput = document.getElementById("question");

const answerBox = document.getElementById("answer");

const pdfFile = document.getElementById("pdfFile");


// 2. Check whether the JavaScript file loaded

console.log("EmbeddedGPT JavaScript Loaded");


// 3. Listen for the Ask button click

button.addEventListener("click", function () {

    // 4. Get the question typed by the user

    let question = questionInput.value;


    // 5. Remove unnecessary spaces

    question = question.trim();


    // 6. Check whether the question is empty

    if (question === "") {

        answerBox.value = "Please enter a question.";

        return;
    }


    // 7. Check whether a PDF has been selected

    if (pdfFile.files.length === 0) {

        answerBox.value = "Please upload a datasheet PDF first.";

        return;
    }


    // 8. Get the uploaded PDF

    const selectedFile = pdfFile.files[0];


    // 9. Check whether the selected file is actually a PDF

    if (selectedFile.type !== "application/pdf") {

        answerBox.value = "Please select a valid PDF datasheet.";

        return;
    }


    // 10. Temporary response

    answerBox.value =
        "Datasheet uploaded successfully.\n\n" +
        "Your question:\n" +
        question +
        "\n\n" +
        "AI processing will be added in the next stage.";


});
