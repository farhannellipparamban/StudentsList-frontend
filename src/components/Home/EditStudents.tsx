import React, { useState, useEffect } from "react";
import { updateStudent } from "../../api/adminApi";
import { toast } from "react-toastify";

interface EditStudentProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  student: Student;
  updateStudentList: () => void;
}

interface Student {
  _id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  enrollNo?: string;
  doAdmission?: string;
}

const EditStudent: React.FC<EditStudentProps> = ({
  showModal,
  setShowModal,
  student,
  updateStudentList,
}) => {
  const [editStudent, setEditStudent] = useState<Student>(student);

  useEffect(() => {
    setEditStudent(student);
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditStudent({ ...editStudent, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {message}=await updateStudent(editStudent._id as string, editStudent);
      updateStudentList();
      toast.success(message);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student. Please try again later.");
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start p-5">
                    <div className="-mt-3 text-center sm:text-left w-full">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900 mb-5"
                        id="modal-headline"
                      >
                        Edit Student
                      </h3>
                      <div className="mt-2">
                        <div className="mb-4">
                          <input
                            type="name"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={editStudent.name || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={editStudent.email || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="number"
                            id="mobile"
                            name="mobile"
                            placeholder="Phone"
                            value={editStudent.mobile || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="number"
                            id="enrollNo"
                            name="enrollNo"
                            placeholder="Enroll Number"
                            value={editStudent.enrollNo || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="-mb-3">
                          <input
                            type="date"
                            id="doAdmission"
                            name="doAdmission"
                            placeholder="Date of Admission"
                            value={editStudent.doAdmission || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-24 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Update
                  </button>
                </div>
                <div className="flex justify-center mt-4 mb-12">
                  <button
                    type="button"
                    className="px-24 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-800"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStudent;
