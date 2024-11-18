import React, { useState } from "react";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebase/config";
import { useAuth } from "../../context/AuthContext";

const StudentHire = ({ tutorId, schedule }) => {
  const { user } = useAuth(); // Current logged-in user (student)
  const [loading, setLoading] = useState(false);

  const handleHireTutor = async () => {
    if (!user) {
      alert("You need to be logged in to hire a tutor.");
      return;
    }

    try {
      setLoading(true);

      // Update the tutor's schedule
      const scheduleRef = doc(db, "tutors", tutorId, "schedules", schedule.id);
      await updateDoc(scheduleRef, {
        student: {
          name: user.displayName || user.email, // Student's name
          email: user.email, // Student's email
          uid: user.uid, // Student's UID
        },
      });

      // Log the tutoring session in the student's "tutories" collection
      const studentTutoriesRef = collection(db, "students", user.uid, "tutories");
      await addDoc(studentTutoriesRef, {
        tutorId,
        tutorName: schedule.tutorName,
        day: schedule.day,
        time: schedule.time,
        status: "In progress", // Initial status of the tutoring session
      });

      alert("You have successfully hired this tutor.");
    } catch (error) {
      console.error("Error hiring the tutor:", error);
      alert("An error occurred while hiring the tutor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleHireTutor}
      disabled={loading || schedule.student}
      style={{
        padding: "10px 20px",
        backgroundColor: schedule.student ? "#ccc" : "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: schedule.student ? "not-allowed" : "pointer",
      }}
    >
      {schedule.student ? "Reserved" : "Hire"}
    </button>
  );
};

export default StudentHire;
