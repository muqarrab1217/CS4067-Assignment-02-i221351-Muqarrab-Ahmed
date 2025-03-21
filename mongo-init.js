db = connect("mongodb://root:muqi1217@localhost:27017/admin");

db = db.getSiblingDB("eventbooking"); // Switch to 'eventbooking' database

db.events.insertMany([
  {
    title: "Nascon '25",
    description: "<h3>NASCON (National Students Conference) Event Description</h3><p>The biggest tech conference...</p>",
    date: new Date("2025-03-21T12:41:28.063Z"),
    location: "Islamabad, Pakistan",
    price: 1200,
    tickets: 180,
    image: "canada.jpeg",
    category: "Tech",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Tech Fest 2025",
    description: "<h3>Tech Fest 2025 - A Gathering of Innovators</h3><p>Join industry leaders...</p>",
    date: new Date("2025-05-15T10:00:00.000Z"),
    location: "Lahore, Pakistan",
    price: 1500,
    tickets: 200,
    image: "techfest.jpeg",
    category: "Technology",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print("✅ Successfully inserted events into MongoDB!");
