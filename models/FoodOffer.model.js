const { Schema, model } = require("mongoose");

const foodOfferSchema = new Schema(
  {
    items: [{
        name: String,
        quantity: Number,
        category: [String],
        reserved: Boolean,
        pickedUp: Boolean,
    }],

    pickUpDateStart: Date, 
    pickUpDateEnd: Date, 

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
    pickUpAddress: {
        firstName: String,
        LastName: String,
        CompanyName: String,
        street: String,
        houseNumber: String,
        zipCode: String,
        country: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const FoodOffer = model("FoodOffer", foodOfferSchema);

module.exports = FoodOffer;
