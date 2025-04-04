const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    employees: async () => {
      return await Employee.find();
    },
    employee: async (_, { id }) => {
      return await Employee.findById(id);
    }
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('Email already in use');
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    addEmployee: async (_, { input }) => {
      const employee = new Employee(input);
      await employee.save();
      return employee;
    },
    updateEmployee: async (_, { id, input }) => {
      return await Employee.findByIdAndUpdate(id, input, { new: true });
    },
    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return true;
    }
  }
};

module.exports = resolvers;