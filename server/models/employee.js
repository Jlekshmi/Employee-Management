import mongoose from "mongoose";

// Create a new schema instance for the Employee model
const Schema = mongoose.Schema;

// Define the schema for the Employee model
const employeeSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
  dateOfJoining: { type: Date, required: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  employeeType: { type: String, required: true },
  currentStatus: { type: Boolean, required: true}
},
{
  statics: {
    async getMaxId() {
      const employee = await this.findOne({}).sort({ id: -1 });
      return employee?.id || 0;
    }
  }
});
// Create and export the Employee model using the defined schema
export const Employee = mongoose.model('Employee', employeeSchema);