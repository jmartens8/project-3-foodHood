const { Schema, model, SchemaTypes } = require("mongoose");

const foodOfferSchema = new Schema(
  {
    items: [{
        name: String,
        quantity: Number,
        category: Array,
        reserved: Boolean,
        reservedBy: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        pickedUp: Boolean,
        comment: String,
    }],

    pickUpDateStart: Date, 
    pickUpDateEnd: Date, 

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
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
