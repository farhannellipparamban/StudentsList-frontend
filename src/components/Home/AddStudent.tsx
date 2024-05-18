import React from "react";
interface Student {
  _id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  enrollNo?: string;
  doAdmission?: string;
}
interface AddStudentProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  newStudent: Student;
  setNewStudent: React.Dispatch<React.SetStateAction<Student>>;
  addStudent: (student: Student) => Promise<any>;
  updateStudentList: () => Promise<void>;
}

const AddStudent: React.FC<AddStudentProps> = ({
  showModal,
  setShowModal,
  newStudent,
  setNewStudent,
  addStudent,
  updateStudentList,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addStudent(newStudent);
      setShowModal(false);
      setNewStudent({
        name: "",
        email: "",
        mobile: "",
        enrollNo: "",
        doAdmission: "",
      });
      console.log("Updating student list...");

      await updateStudentList();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div>
      {showModal ? (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block font-medium mb-2">
                  Phone
                </label>
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  value={newStudent.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="enrollNo" className="block font-medium mb-2">
                  Enroll No
                </label>
                <input
                  type="number"
                  id="enrollNo"
                  name="enrollNo"
                  value={newStudent.enrollNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="doAdmission" className="block font-medium mb-2">
                  Date of Admission
                </label>
                <input
                  type="date"
                  id="doAdmission"
                  name="doAdmission"
                  value={newStudent.doAdmission}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2 hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddStudent;
