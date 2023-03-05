print("Adding User......");
db = db.getSiblingDB("admin");
db.createUser({
  user: "myuser",
  pwd: "mypassword",
  roles: [{ role: "readWrite", db: "admin" }],
});
print("End Adding UserRoles.");