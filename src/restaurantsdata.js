const restaurants = [
  {
    name: "The Fat Duck",
    description:
      "The Fact Duck is a brand new restaurant offering delicious food, you will find whatever you ask for",
    status: "Open",
    reviews: [
      {
        userId: "1",
        rate: 4,
        comment: "Great restaurant",
      },
    ],
    address: "12 -HS street 378",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPRv08xClTpeOgeKbJvTbQU3Bx--2n2Aj5Ow&usqp=CAU",
    todaysMenu: [
      {
        name: "PEPPER BARBECUE CHICKEN",
        price: 6,
        category: "nonveg",
        image: "https://www.dominos.co.in/files/items/Pepper_Barbeque.jpg",
        description: "Pepper Barbecue Chicken I Cheese",
      },
      {
        name: "Non Veg Supreme",
        price: 4,
        category: "nonveg",
        image: "https://www.dominos.co.in/files/items/Non-Veg_Supreme.jpg",
        description:
          "Bite into supreme delight of Black Olives, Onions, Grilled Mushrooms, Pepper BBQ Chicken, Peri-Peri Chicken, Grilled Chicken Rashers",
      },
      {
        name: "Golden Corn Pizza",
        price: 9,
        category: "veg",
        description:
          "Corn over the base makes it look beautiful. It is served with tomato sauce and chili flakes are sprinkled over the topping according the taste. After mixing all the ingredients, it is baked by adding cheese and corn for added flavor to pizza. Corn adds health and sweet taste to the pizza.",
        image:
          "https://www.dominos.co.in/theme2/front/images/menu-images/my-pizzamania.png",
      },
    ],
  },
  {
    name: "Jamle's Italian",
    description:
      "Jamle's Italian is a brand new restaurant offering delicious food, you will find whatever you ask for",
    status: "Closed",
    reviews: [
      {
        userId: "2",
        rate: 3,
        comment: "good restaurant",
      },
      {
        userId: "6",
        rate: 4.6,
        comment: "Great restaurant and delicous meals",
      },
    ],
    address: "Italy-bergs street E-89",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPilhOTH7kWWCTNbV9mZu9Jm_LEpFxAgUrg&usqp=CAU",
    todaysMenu: [
      {
        name: "Jalapeno & Red Paprika Pizza",
        price: 3.6,
        category: "veg",
        image:
          "https://www.dominos.co.in/theme2/front/images/menu-images/sides_beverages.jpg",
        description:
          "This pizza is amazing and can become more delicious if we will add some more cheese in it. Ingredients are yeast, sugar, olive oil, salt, and all-purpose flour in a big bowl. After mixing all the ingredients, it is baked by adding Jalapeno and Paprika with corns over the cheese layer. The base is made crunchy to give it best taste. It can be made more tasty by sprinkling chili flakes and Oregano as per the taste.",
      },
      {
        name: "Margerita",
        price: 2.8,
        category: "veg",
        image:
          "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza-500x500.jpg",
        description:
          "The pizza base is made by mixing yeast, sugar, olive oil, salt, and all-purpose flour in a big bowl. After mixing all the ingredients, it is baked by adding the cheese as topping over it. The base is perfectly prepared by adding single layer of cheese over it. It is mouth-watering pizza for cheese lovers.",
      },
      {
        name: "Double Cheese Margherita Pizza",
        price: 4,
        category: "veg",
        image:
          "https://www.dominos.co.in/files/items/046015%20garlic%20bread_1346075642.jpg",
        description:
          "This is a plain pizza which have cheese on it which is margherita and is delicious because of the loads of cheese. After mixing all the ingredients, it is baked by adding the cheese as topping over it. The base is perfectly prepared by adding double layer of cheese over it",
      },
    ],
  },
];

export default restaurants;
