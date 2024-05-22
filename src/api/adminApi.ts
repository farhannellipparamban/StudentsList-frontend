import { axiosAuthorized } from "./config";

interface Student {
  id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  enrollNo?: string;
  doAdmission?: string;
}

// Fetches all students from the server.
const getAllStudents = async () => {
  try {
    const response = await axiosAuthorized.get("/allStudents");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Adds a new student.
const addStudent = async (student: Student) => {
  try {
    const response = await axiosAuthorized.post("/addStudent", student);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Updates an existing student.
const updateStudent = async (id: string, student: Student) => {
  try {
    const response = await axiosAuthorized.put(`/editStudent/${id}`, student);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Deletes an existing student.
const deleteStudent = async (id: string) => {
  try {
    const response = await axiosAuthorized.delete(`/deleteStudent/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAllStudents, addStudent, updateStudent, deleteStudent };
