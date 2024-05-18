import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { addStudent, deleteStudent, getAllStudents } from "../../api/adminApi";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudents";

interface Student {
  _id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  enrollNo?: string;
  doAdmission?: string;
}

const StudenstList: React.FC = () => {
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    name: "",
    email: "",
    mobile: "",
    enrollNo: "",
    doAdmission: "",
  });

  const getStudents = async () => {
    try {
      const response = await getAllStudents();
      if (response && response.data && Array.isArray(response.data)) {
        setStudentList(response.data);
      } else {
        console.error("Unexpected data format from API:", response);
        setStudentList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleEdit = (student: Student) => {
    setEditStudent(student);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStudent(id);
      setStudentList((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = (date as any).toLocaleDateString("en-US", options);
    const [month, day, Year] = formattedDate.split(" ");
    return `${day.replace(",", "")}-${month}, ${Year}`;
  }

  return (
    <div className="container mx-auto px-1 sm:px-3">
      <div className="flex flex-col sm:flex-row justify-between items-center my-3">
        <h1 className="font-bold text-3xl mb-3 sm:mb-0">Students</h1>
        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-5">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 pr-28 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105 placeholder-gray-500 mb-3 sm:mb-0 w-full sm:w-auto"
          />
          <button
            onClick={() => {
              setEditStudent(null);
              setShowModal(true);
            }}
            className="px-3 py-2 sm:py-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
            <div className="flex sm:hidden justify-center items-center w-full">
              <span>Add</span>
            </div>{" "}
            <span className="hidden sm:inline">ADD NEW STUDENT</span>
          </button>
          {showModal &&
            (editStudent ? (
              <EditStudent
                showModal={showModal}
                setShowModal={setShowModal}
                student={editStudent}
                updateStudentList={getStudents}
              />
            ) : (
              <AddStudent
                showModal={showModal}
                setShowModal={setShowModal}
                newStudent={newStudent}
                setNewStudent={setNewStudent}
                addStudent={addStudent}
                updateStudentList={getStudents}
              />
            ))}
        </div>
      </div>
      <div className="py-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-lg overflow-hidden border border-gray-400 sm:rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                      >
                        NAME
                      </th>
                      <th
                        scope="col"
                        className="hidden px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell sm:px-6"
                      >
                        EMAIL
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                      >
                        PHONE
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell md:px-6"
                      >
                        ENROLL NUMBER
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider lg:table-cell lg:px-6"
                      >
                        DATE OF ADMISSION
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentList &&
                    Array.isArray(studentList) &&
                    studentList.length > 0 ? (
                      studentList.map((student) => (
                        <tr
                          key={student._id}
                          className="hover:bg-gray-100 transition-colors"
                        >
                          <td className="px-1 py-4 whitespace-nowrap sm:px-6">
                            <div className="flex items-center text-sm text-black">
                              <img
                                src="/download (1).png"
                                alt=""
                                className="rounded-full w-8 h-8 mr-2"
                              />
                              <span className="font-semibold">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="hidden px-4 py-4 whitespace-nowrap sm:table-cell">
                            <div className="text-sm text-black">
                              {student.email}
                            </div>
                          </td>
                          <td className="px-2 py-6 whitespace-nowrap sm:px-6">
                            <span className="text-sm text-black">
                              {student.mobile}
                            </span>
                          </td>
                          <td className="hidden px-8 py-4 whitespace-nowrap md:table-cell">
                            <span className="text-sm text-black">
                              {student.enrollNo}
                            </span>
                          </td>
                          <td className="hidden px-8 py-4 whitespace-nowrap lg:table-cell">
                            <span className="text-sm text-black">
                              {formatDate(student.doAdmission as string)}
                            </span>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap sm:px-6">
                            <div className="flex gap-2">
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => handleEdit(student)}
                                className="text-blue-600 cursor-pointer"
                              />
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                onClick={() => handleDelete(student._id!)}
                                className="text-red-500 cursor-pointer"
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center">
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudenstList;
