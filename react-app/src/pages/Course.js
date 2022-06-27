import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useEffect } from "react/cjs/react.production.min";

const CoursePage = () => {

    const [courseName, setCourseName] = useState("");
    const [courseFee, setCourseFee] = useState("");
    const [students, setstudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isEditClick, setIsEdit] = useState(false);
    const [editId, setEditId] = useState("");

    const [editName, setEditName] = useState("");
    const [editFee, setEditFee] = useState("");
    const [editStudent, setEditStudent] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.BASE_URL}/course/`).then((res) => {
            setCourses(res.data);
        });

    }, [])

    const saveData = (e) => {
        e.preventDefault();
        const courseObj={
            courseName, 
            courseFee, 
            students
        };
        // console.log(courseObj)

        axios.post(`${process.env.BASE_URL}/course/add`, courseObj).then(res => {
            alert("data added");
            axios.get(`${process.env.BASE_URL}/course/`).then((res) => {
                setCourses(res.data);
            });
        })
        .catch((err) => {
            alert(err.message);
        });
    };

    const updateData = (e) => {
        e.preventDefault();
        const courseObj={
            courseName: editName, 
            courseFee: editFee, 
            students: editStudent
        };

        axios.put(`${process.env.BASE_URL}/course/${editId}`, courseObj).then((res) => {
            alert("Course Update");
            axios.get(`${process.env.BASE_URL}/course/`).then((res) => {
                setCourses(res.data);
            });

            setIsEdit(false);
            
        })
        .catch((err) => {
            alert(err.message);
        });

    }

    const deleteCourse = (e) => {
        e.preventDefault();
        axios.delete(`${process.env.BASE_URL}/course/${e.target.id}`).then(() => {
            axios.get(`${process.env.BASE_URL}/course/`).then((res) => {
                setCourses(res.data);
            });

        })
        .catch((err) => {
            alert(err.message);
        });
    }

    const onEditClick = (e) =>{
        e.preventDefault();
        setEditId(e.target.id);
        setIsEdit(!isEditClick);

        const course = courses.find(course => course._id === e.target.id);
        console.log(course);
        setEditName(course.courseName);
        setEditFee(course.courseFee);
        setEditStudent(course.students);
        console.log(e.target.id);
    }

    return (
        <div>
            <h1> Course page</h1>
            <div>
                <input type="text" placeholder="Enter course name" value={courseName} onChange={e => setCourseName(e.target.value)} /><br/>
                <input type="number" placeholder="Enter course fee" value={courseFee} onChange={e => setCourseFee(e.target.value)} /><br/>
                <button onClick={ (e) => saveData(e) }>Submit</button><br/>

                <table>
                    <tr>
                        <th>Course Name</th>
                        <th>Course Fee</th>
                    </tr>
                    {courses && courses.length > 0 && courses.map((course, index) => (
                        <tr key={index}>
                            <td>{isEditClick && course._id === editId ? 
                            <input type="text" value={editName} onChange={e => setEditName(e.target.value)} />: course.courseName}</td>
                            
                            {/* <td>{course.courseFee}</td> */}

                            <td>{isEditClick && course._id === editId ? 
                            <input type="number" value={editFee} onChange={e => setEditFee(e.target.value)} />: course.courseFee}</td>
                            <td>
                                <button id={course._id} onClick={e => onEditClick(e)}>
                                    {isEditClick && course._id === editId ? "Cancel": "Update"}
                                </button>
                                {isEditClick && course._id === editId && <button onClick={(e) => updateData(e)}>Save</button>}
                                <button id={course._id} onClick={e => deleteCourse(e)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>

                {/* <code>
                    <pre>{JSON.stringify(courses, null, 2)}</pre>
                </code> */}
            </div>
        </div>
    );
};

export default CoursePage;