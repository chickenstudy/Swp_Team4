import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlineFieldTime } from "react-icons/ai";
import axios from "axios";
import ReactPlayer from "react-player";
import { Dropdown, Modal } from "react-bootstrap";
import "./informationMovie.css";
import { useContext } from "react";
import { ApplicationContext } from "../../../App";
import { ToastContainer, toast } from "react-toastify";

const InformationMovie = () => {
  const { user } = useContext(ApplicationContext);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [showtime, setShowtime] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selected, setSelected] = useState(false);
  const [datelist, setDatelist] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleCinemaChange = (event) => {
    const cinemaId = event.target.value;
    const selectedCinema = cinema.find(
      (cinemaItem) => cinemaItem.cinemaid === parseInt(cinemaId)
    );
    setSelectedCinema(selectedCinema || null);
  };
  sessionStorage.setItem("movieid", id);
  const [startTime, setStartTime] = useState("");
  const handleTicketClick = (date, cinema, showtime, movieName, cinemaid) => {
    // Save values to session storage
    setStartTime(showtime);
    sessionStorage.setItem("date", date);
    sessionStorage.setItem("cinema", cinema);
    sessionStorage.setItem("time", showtime);
    sessionStorage.setItem("movie", movieName);
    sessionStorage.setItem("cinemaid", cinemaid);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie/" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/showtime/startdate?movieid=${id}`)

      .then((res) => {
        setDatelist(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cinema/listCinema")
      .then((res) => {
        setCinema(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/showtime/starttime", {
        params: {
          movieid: id,
          cinemaid: selectedCinema.cinemaid,
          startdate: selectedDate,
        },
      })
      .then((res) => {
        setShowtime(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, selectedCinema, selectedDate]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/showtime", {
        params: {
          movieid: id,
          cinemaid: selectedCinema.cinemaid,
          starttime: startTime,
          startdate: selectedDate,
        },
      })
      .then((res) => {
        setData1(res.data[0]);
        setSelected(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, selectedCinema, startTime, selectedDate]);
  sessionStorage.setItem("showtimeid", data1?.id);
  const navigate = useNavigate();
  if (user.length == 0) {
    // alert("Please login to book ticket");
    toast.error("Please login to book ticket");
  } else if (selected === true) {
    navigate("/seat");
  }
  const handleOpenVideoModal = () => {
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
  };

  const [feedbackList, setFeedbackList] = useState([]);

  // Function để lấy danh sách bình luận từ API
  const fetchFeedback = () => {
    axios
      .get(`http://localhost:8080/api/feedback/listFeedback/${id}`)
      .then((res) => {
        setFeedbackList(res.data.feedback);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  // State to store user's comment input
  const [commentInput, setCommentInput] = useState("");

  // Function to handle form submission and add comment to the comments state

  const handleSubmitComment = (event) => {
    if (user.length == 0) {
      toast.error("Please login to comment");
    }
    event.preventDefault();
    if (commentInput.trim() !== "") {
      // Create the comment object with content and userid
      const commentData = {
        feedback: {
          content: commentInput,
          userid: user.userId, // Replace with the actual user ID (if available) or remove this line if you handle the user ID differently
        },
      };

      // Send the comment data to the API
      axios
        .post(`http://localhost:8080/api/feedback/comment/${id}`, commentData)
        .then((res) => {
          // If the comment is successfully added to the database, update the feedbackList state with the new comment
          setFeedbackList((prevFeedback) => [
            ...prevFeedback,
            res.data.feedback,
          ]);
          setCommentInput(""); // Clear the comment input field after successful submission
        })
        .catch((err) => {
          console.log(err.message);
          // Handle error if the comment cannot be added
        });
    }
  };
  const [editedContent, setEditedContent] = useState("");

  const [editingCommentId, setEditingCommentId] = useState(null);

  const handleSubmitEditedComment = (commentId) => {
    if (user.length === 0) {
      toast.error("Please login to update the comment");
    } else {
      if (editedContent.trim() !== "") {
        const updatedFeedback = {
          ...feedbackList.find((feedback) => feedback.feedbackid === commentId),
          content: editedContent,
        };

        axios
          .put(
            `http://localhost:8080/api/feedback/updateComment/${commentId}`,
            { feedback: updatedFeedback }
          )
          .then((res) => {
            // Update the feedbackList state with the updated comment
            setFeedbackList((prevFeedback) => {
              const updatedList = prevFeedback.map((feedback) =>
                feedback.feedbackid === commentId ? updatedFeedback : feedback
              );
              return updatedList;
            });
            toast.success("Comment updated successfully");
          })
          .catch((err) => {
            console.log(err.message);
          })
          .finally(() => {
            // Reset the temporary edited content and comment ID
            setEditedContent("");
            setEditingCommentId(null);
          });
      } else {
        toast.error("Please enter a valid comment");
      }
    }
  };
  const canEditComment = (currentUser, commentOwner) => {
    // Replace this with your actual logic for checking authorization.
    // For example, you can compare the usernames of the current user and the comment owner.
    console.log(currentUser);
    console.log(commentOwner);
    return currentUser == commentOwner;
  };
  // Function to handle cancelling the edit process
  const handleCancelEdit = () => {
    // Reset the temporary edited content and comment ID
    setEditedContent("");
    setEditingCommentId(null);
  };
  const handleDeleteComment = (commentId) => {
    if (user.length == 0) {
      toast.error("Please login to delete the comment");
    } else {
      // Find the index of the comment in the feedbackList array
      const commentIndex = feedbackList.findIndex(
        (feedback) => feedback.feedbackid === commentId
      );

      // Check if the comment exists in the feedbackList
      if (commentIndex !== -1) {
        // Check if the user is the owner of the comment
        if (user.username === feedbackList[commentIndex].username) {
          // Send the delete request to the API
          axios
            .delete(
              `http://localhost:8080/api/feedback/deleteComment/${commentId}`
            )
            .then((res) => {
              // Update the feedbackList state by removing the deleted comment
              setFeedbackList((prevFeedback) => {
                const updatedList = [...prevFeedback];
                updatedList.splice(commentIndex, 1);
                return updatedList;
              });
              toast.success("Comment deleted successfully");
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          toast.error("You are not authorized to delete this comment");
        }
      }
    }
  };

  // ...
  return (
    <div id="">
      <div className="movie_trailer detail_typeA">
        <div className="movie-box d-block">
          <Carousel>
            <Carousel.Item>
              <div className="d-flex justify-content-center ">
                <img
                  className="bannerImg"
                  src={data?.movie?.banner}
                  alt="Banner"
                />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <Container>
        <Row>
          <Col xs={2}></Col>
          <Col className="my-4">
            <div className="wide-top d-flex">
              <div className="thumb">
                <span className="img">
                  <img src={data?.movie?.poster} alt="Poster" />
                </span>
                <Button
                  onClick={handleOpenVideoModal}
                  className="btn_reverse Lang-LBL0000 d-block justify-content-center my-2 rounded-0"
                  style={{
                    width: "175px",
                    border: "2px solid rgb(206, 161, 11)",
                  }}
                  rel="noopener noreferrer"
                  variant="dark"
                >
                  View trailer
                </Button>

                <Modal
                  show={showVideoModal}
                  onHide={handleCloseVideoModal}
                  size="lg"
                >
                  <Modal.Body>
                    <ReactPlayer
                      url={data?.movie?.trailer}
                      width="100%"
                      style={{ aspectRatio: "16/9" }} // Tỷ lệ khung hình 16:9
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseVideoModal}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="info_main">
                <h2 className="movie_title">{data?.movie?.name}</h2>
                <p>
                  <AiOutlineFieldTime size={25} /> {data?.movie?.times}
                </p>
                <p>
                  <strong>Category:</strong> {data?.movie?.type}
                </p>
                <p>
                  <strong>Country:</strong> {data?.movie?.country}
                </p>
                <p>
                  <strong>Release date: </strong>
                  {data?.movie?.show_date}
                </p>
              </div>
            </div>
            <div className="summary my-4">
              <h3>SUMMARY</h3>
              <p className="my-2">{data?.movie?.description}</p>
            </div>
            <div className="showtimes">
              <h3>SHOWTIMES:</h3>

              <Row className="mt-4">
                <Col md={3}>
                  <select
                    style={{
                      height: "40px",
                      width: "100%",
                      paddingLeft: "10px",
                    }}
                    onChange={handleDateChange}
                    value={selectedDate}
                  >
                    <option value="" hidden>
                      Choose a date
                    </option>
                    {datelist.map((dateitem) => (
                      <option key={dateitem} value={dateitem}>
                        {dateitem}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={3}>
                  <select
                    style={{
                      height: "40px",
                      width: "100%",
                      paddingLeft: "10px",
                    }}
                    onChange={handleCinemaChange}
                    value={selectedCinema ? selectedCinema.cinemaid : ""}
                  >
                    <option value="" hidden>
                      Choose a cinema
                    </option>
                    {cinema.map((cinemaitem) => (
                      <option
                        key={cinemaitem.cinemaid}
                        value={cinemaitem.cinemaid}
                      >
                        {cinemaitem.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              {selectedDate && selectedCinema && (
                <div className="cinema mt-5">
                  <div className="title-cinema">
                    <span>{selectedCinema?.name}</span>
                  </div>
                  <div className="item-cinema">
                    <Row>
                      <Col></Col>
                      <Col xs={8}>
                        {showtime.map((showtimeitem) => (
                          <span className="ml-3" key={showtimeitem.showtimeid}>
                            {" "}
                            <Button
                              onClick={() =>
                                handleTicketClick(
                                  selectedDate,
                                  selectedCinema?.name,
                                  showtimeitem,
                                  data?.movie?.name,
                                  selectedCinema?.cinemaid // Thêm cinemaid vào session storage
                                )
                              }
                              style={{ border: "1px solid black" }}
                              variant="light"
                            >
                              {showtimeitem}
                            </Button>
                          </span>
                        ))}
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
        <Row>
          <Col xs={2}></Col>
          <Col xs={8}>
            <div className="comment-section my-4">
              <h3>Comment </h3>
              <form onSubmit={handleSubmitComment}>
                <div className="d-flex">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Enter your comment..."
                    className="form-control mr-2"
                  />
                  <Button type="submit" className="btn btn-dark">
                    Send
                  </Button>
                </div>
              </form>

              <div className="comments mt-3">
                {feedbackList.reverse().map((feedback) => (
                  <div key={feedback.feedbackid} className="my-2">
                    {/* Hiển thị ảnh và tên người dùng */}
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={feedback.picture} // Thay URL_AVATAR bằng đường dẫn tới thư mục chứa ảnh avatar của người dùng
                        alt="Avatar"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      <strong>{feedback.username}</strong>
                      {user.username == feedback.username && (
                        <div className="comment-options">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id={`commentDropdown${feedback.feedbackid}`}
                            >
                              <i className="fas fa-ellipsis-h"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() =>
                                  handleDeleteComment(feedback.feedbackid)
                                }
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      )}
                    </div>
                    {/* Hiển thị ngày bình luận */}
                    <div>{feedback.createddate}</div>
                    {/* Hiển thị nội dung bình luận */}
                    <div>{feedback.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default InformationMovie;
