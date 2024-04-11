import express from "express";

export const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  const createdUser = await userModel.create(req.body);
  res.status(201).send(createdUser);
});

userRouter.get("/", async (req, res) => {
  const users = await userModel.findAll({});
  res.status(200).send(users);
});

userRouter.get("/:id", async (req, res) => {
  const user = await userModel.findOne({_id: req.params.id});
  res.status(200).send(user);
})

userRouter.patch("/:id", async (req, res) => {
  const updatedUser = await userModel.findOneAndUpdate(
    {_id: req.params.id}, req.body, {new: true}
  );
    res.status(200).send(updatedUser);
});

userRouter.delete("/:id", async (req, res) => {
  const deletedUser = await userModel.findOneAndDelete({_id: req.params.id});
  res.status(200).send(deletedUser);
});