const { TasksModel } = require("../model/tasksModel.js");
const asyncWrapper = require("../middleware/async.js");
const { createCustomError, error } = require("../errors/customError.js");
const getAllTasks = asyncWrapper(async (req, res) => {
  // try {
  //   const tasks = await TasksModel.find({});
  //   // console.log(task);
  //   res.status(200).send({ tasks });
  // } catch (error) {
  //   res.status(500).json({ msg: error });
  // }
  const tasks = await TasksModel.find({});
  // console.log(task);
  res.status(200).send({ tasks });
});
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TasksModel.findOne({ _id: taskID });

  // console.log(task);
  if (!task) {
    // return res.status(404).json({ mag: `No task with id : ${taskID}` });
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});
const createTask = asyncWrapper(async (req, res) => {
  // create document
  const task = await TasksModel.create(req.body);
  // const result = await task.save();

  res.status(201).json({ task });
});
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await TasksModel.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    // const error = new Error("Not Found");
    return next(createCustomError(`No task with id : ${taskID}`, 404));
    // error.status = 404;
    // return next(error);
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task });

  // res.send("updtae tasks");
});
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TasksModel.findOneAndDelete({ _id: taskID });
  // console.log(task);
  if (!task) {
    // return res.status(404).json({ mag: `No task with id : ${taskID}` });
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
  // res.status(201).json({ task: null, status: "success" });

  // res.send("delete tasks");
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
