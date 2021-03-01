import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "./Axios";
// import { Link } from "react-router-dom";
import Maps from "./maps";
import NewVenues from "./newVenues";

import { useSelector, useDispatch } from "react-redux";
import { showAllVenues } from "./actions";

export default function Home(props) {
    // console.log("props in maps: ", props);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showAllVenues());
    }, []);

    return (
        <>
            <h1>
                <span className="orange">Welcome</span>
                <span>
                    {" "}
                    {props.first} {props.last}
                </span>
            </h1>
            <p className="handwrite">and all that jazz</p>

            <Maps
                id={props.id}
                first={props.first}
                last={props.last}
                email={props.email}
                pic={props.pic}
                updateProfileData={props.updateProfileData}
                setProfilePicUrl={props.setProfilePicUrl}
                venId={props.venId}
                venName={props.venName}
                lat={props.lat}
                lng={props.lng}
                venDescription={props.venDescription}
                updateNewVen={props.updateNewVen}
            />
            <NewVenues
                id={props.id}
                first={props.first}
                last={props.last}
                venId={props.venId}
                venName={props.venName}
                venDescription={props.venDescription}
                venImage={props.venImage}
                updateNewVen={props.updateNewVen}
            />
        </>
    );
}