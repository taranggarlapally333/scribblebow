import React, { useState, useEffect } from "react";
import { CircleSlider } from "react-circle-slider";
import Zoom from "@material-ui/core/Zoom";

export default function ScribblePlayer(props) {


  const settingZoom = () => {
    props.play(false);
  }
  return <Player settingZoom={settingZoom} />
}







function Player(props) {
  var playing = false;
  const [url, setUrl] = useState("");


  window.addEventListener("storage", (e) => {
    setUrl("abcd");
  });

  useEffect(() => {
    playAudio();
  });



  const playAudio = () => {
    document.getElementById("playaudio").play();
    playing = true;
  }

  const pauseAudio = () => {
    document.getElementById("playaudio").pause();
    playing = false;
  }

  const togglePlay = () => {
    playing === true ? pauseAudio() : playAudio();
  }

  const curTime = () => {
    return document.getElementById("playaudio").currentTime;
  }


  const handleSliderChange = (value) => {
    const aud = document.getElementById("playaudio");
    aud.currentTime = (value / 100) * aud.duration;
  }



  const xaudio = <audio id="playaudio" controls preload autobuffer autoplay style={{ display: "none", outline: "none" }} loop controlsList="nodownload">
    <source src={"https://firebasestorage.googleapis.com/v0/b/scribblebow.appspot.com/o/AudioFiles%2FRise%20%E2%80%94%20Airixis%20%5BAudio%20Library%20Release%5D.mp3?alt=media&token=d4b206f9-342e-4fba-8761-d9d984445395"} type="audio/mp3" ></source>
  </audio>



  return <Zoom in={true}>
    <div className="audioplayer myshadow" style={{ height: "200px", width: "200px", borderRadius: "50%", backgroundColor: "#2E2B5F", bottom: "5vh", right: "20px", position: "absolute", zIndex: "100" }}>
      <div className="audio-close myshadow pointer" onClick={() => { props.settingZoom(); pauseAudio(); }}><i class="fa fa-close" style={{ marginTop: "15px", marginLeft: "15px", opacity: "0.5", fontSize: "24px", color: "grey" }}></i></div>

      <img className="audio-image" src="https://wallpapercave.com/wp/wp3022826.jpg" alt="music cover" />

      <div className="audio-ops" >
        <i className="fas fa-heart pointer" style={{ fontSize: "24px", color: "grey" }} onClick={() => { alert("like") }}></i>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <PlayPauseButton togglePlay={togglePlay} />
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <i className="fa fa-plus pointer" style={{ fontSize: "24px", color: "grey" }} onClick={() => { alert("plus") }}></i>
      </div>
      <div style={{ marginTop: "-40px", marginLeft: "10px" }}>
        <CirclularSlider handleSliderChange={handleSliderChange} />
      </div>
      {xaudio}

    </div>
  </Zoom>

}





function PlayPauseButton(props) {
  const [playing, setPlaying] = useState(true);
  return <i className={playing ? "fa fa-pause pointer" : "fa fa-play pointer"} style={{ fontSize: "24px", color: "grey" }} onClick={() => { props.togglePlay(); setPlaying(!playing) }}></i>
}


function CirclularSlider(props) {
  const [val,setVal] = useState(0);
  useEffect(() => {

    var vid = document.getElementById("playaudio");

    vid.ontimeupdate = function () { updateSlider() };
    function updateSlider() {
      const aud =  document.getElementById("playaudio");
      if(aud){
      const newVal = (aud.currentTime/aud.duration)*100;
      setVal(newVal);
      }
    }
  });

  return <CircleSlider onChange={props.handleSliderChange} value={val} knobRadius={10} progressWidth={5} progressColor={"#f5ba13"} />
}