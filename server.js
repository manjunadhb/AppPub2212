const express = require("express");
const cors = require("cors");

let app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));


app.listen(1234, () => {
  console.log("Listening to port 1234");
});

const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/Batch2212");

mongoose.connect(
  "mongodb+srv://manjunadhb:manjunadhb@cluster0.r7mghwi.mongodb.net/Batch2212?retryWrites=true&w=majority"
);
let interneeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z ]{2,30}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid name!`,
    },
  },
  gender: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["male", "female"],
    message: "{VALUE} is not a valid gender",
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid email id!`,
    },
    required: [true, "User email required"],
  },
  mobileNo: String,
  age: {
    type: Number,
    min: [18, "too early to create account"],
    max: [80, "too late to create account"],
    required: true,
  },
});

let Internee = new mongoose.model("internee", interneeSchema);

app.get("/getInternees", async (req, res) => {
  let results = await Internee.find();

  res.json(results);
});

let saveIntoDB = async () => {
  // Error Handling
  try {
    let sachin = new Internee({
      name: "Sachin Tendulkar",
      email: "sai@gmail.com",
      mobileNo: "+91-9988776655",
      age: 22,
      gender: "MALE",
    });

    await sachin.save();

    // await dinesh.save();
    // await sai.save();

    // await Internee.insertMany([dinesh, sai]);

    console.log("Saved successfully");
  } catch (error) {
    console.log(error);
    console.log("something is wrong and not saved");
  }
};

saveIntoDB();
