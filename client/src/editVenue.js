import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./Axios";
import { myLastV, updateVen as updateVenue } from "./actions";
import DeleteVenue from "./deleteVenue";

export default function EditVenue(props) {
    // console.log("props in edit VENUE", props);

    const dispatch = useDispatch();

    // let [lat, setLat] = useState("");
    // let [lng, setLng] = useState("");

    // const fullState = useSelector((state) => state);
    // console.log("fullState", fullState);
    let [venueName, setVenueName] = useState("");
    let [description, setDescription] = useState("");
    let [venuePic, setVenuePic] = useState("");

    const [error, setError] = useState(false);
    const [errorNoname, setErrorNoname] = useState(false);
    const [errorPic, setErrorPic] = useState(false);

    const showLast = useSelector((state) => state.lastVen);
    // console.log("showLast[0].lat", showLast[0].lat);
    // console.log("showLast[0].id", showLast[0].id);

    const submitVenue = (e) => {
        e.preventDefault();
        // let formData = new FormData();
        let formDataPic = new FormData();
        let lat = props.lat;
        let lng = props.lng;
        let venId = props.venId;
        let id = props.id;
        console.log("ID", props.id);
        console.log("venId", props.venId);

        venueName = venueName.length == 0 ? showLast[0].name : venueName;
        description =
            description.length == 0 ? showLast[0].description : description;

        // description = description.length == 0 ? props.description : description;
        // venuePic = venuePic == false ? props.venuePic : venuePic;

        formDataPic.append("venueName", venueName);
        formDataPic.append("description", description);
        formDataPic.append("file", venuePic);
        formDataPic.append("lat", props.lat);
        formDataPic.append("lng", props.lng);
        formDataPic.append("venId", props.venId);
        formDataPic.append("id", props.id);

        if (venueName.length == 0) {
            setErrorNoname(true);
        } else if (venuePic != 0) {
            axios
                .post("/edit-venue-pic", formDataPic)
                .then((res) => {
                    // console.log(
                    //     "resp in edit-venue-pic axios POST",
                    //     res.data.rows
                    // );
                    setError(false);

                    props.updateNewVen(res.data.rows[0]);

                    dispatch(updateVenue(res.data.rows[0]));

                    dispatch(myLastV(res.data.rows[0]));
                })
                .catch((err) => {
                    console.log("error in POST edit venue pic submit", err);
                    setErrorPic(true);
                    setErrorNoname(false);
                });
        } else {
            axios
                .post("/edit-venue", {
                    id,
                    venId,
                    venueName,
                    description,
                    lat,
                    lng,
                })
                .then((res) => {
                    console.log("resp in add-venue no pic axios POST", res);
                    props.updateNewVen(res.data.rows[0]);

                    setError(false);
                    dispatch(myLastV(res.data.rows[0]));
                    dispatch(updateVenue(res.data.rows[0]));
                })
                .catch((err) => {
                    console.log("error in POST edit venue submit", err);
                    setError(true);
                });
        }
    };

    // const [delCon, setDelCon] = useState(false);

    // const toggleDelete = () => {
    //     console.log("toggle del pressed");
    //     setDelCon(!delCon);
    // };

    return (
        <>
            <div className="pro-fields">
                <input
                    onChange={(e) => setVenueName(e.target.value)}
                    name="name"
                    type="text"
                    placeholder="Venue Name"
                    autoComplete="off"
                    defaultValue={showLast[0].name}
                ></input>
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    name="text-area"
                    type="text"
                    placeholder="Description"
                    autoComplete="off"
                    defaultValue={showLast[0].description}
                ></input>

                <input
                    className="input-file"
                    onChange={(e) => setVenuePic(e.target.files[0])}
                    name="file"
                    type="file"
                    accept="image/*"
                />

                <button
                    className="btn upload"
                    onClick={(e) => {
                        submitVenue(e);
                        props.toggleEditVenue();
                    }}
                >
                    Submit
                </button>

                <DeleteVenue
                    id={props.id}
                    venId={props.venId}
                    delCon={props.delCon}
                />
            </div>
        </>
    );
}

//  <a
//      className="del-box"
//      onClick={() => {
//          toggleDelete();
//      }}
//  >
//      Delete Venue
//  </a>;

// {
//     delCon && (
//         <DeleteVenue
//             venId={props.venId}
//             toggleDelete={toggleDelete}
//             delCon={props.delCon}
//         />
//     );
// }
