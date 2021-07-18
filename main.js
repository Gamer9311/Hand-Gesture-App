prediction_1 = " ";

prediction_2 = " ";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(' #camera ');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = "<img id='captured_image' src=" + data_uri + ">";
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tCivXynK3/model.json', modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function speak()
{
    var synth = window.speechSynthesis;

    speak1 = "The First Prediction is " + prediction_1;
    speak2 = "and the second prediction is " + prediction_2;

    var utterThis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterThis);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);

        document.getElementById("result_gesture_name1").innerHTML = results[0].label;
        document.getElementById("result_gesture_name2").innerHTML = results[1].label;

        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        speak();

        if (results[0].label == "YO!!!")
        {
            document.getElementById("update_emoji1").innerHTML = "&#129304";
        }

        if (results[0].label == "Thumbs Up!")
        {
            document.getElementById("update_emoji1").innerHTML = "&#128077";
        }

        if (results[0].label == "Thumbs Down!")
        {
            document.getElementById("update_emoji1").innerHTML = "&#128078";
        }


        if (results[1].label == "YO!!!")
        {
            document.getElementById("update_emoji2").innerHTML = "&#129304";
        }

        if (results[1].label == "Thumbs Up!")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128077";
        }

        if (results[1].label == "Thumbs Down!")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128078";
        }
    }
}
