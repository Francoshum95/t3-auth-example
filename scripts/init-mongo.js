print("Adding User......");
db.createUser({
  user: "myuser",
  pwd: "mypassword",
  roles: [{ role: "root", db: "admin" }],
});
print("End Adding UserRoles.");