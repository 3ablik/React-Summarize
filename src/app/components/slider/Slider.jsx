const Slider = ({ sliderData, sliderIndex, handleSlider }) => {
    return(
        <div>
            <div>
                <h1>Slider</h1>
                <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                    <div
                        style={{ width: "50px", height: "50px" }}
                        onClick={() => handleSlider("left")}
                    >
                        <img
                        style={{
                            transform: "scaleX(-1)",
                            width: "50px",
                            height: "50px",
                        }}
                        src="https://www.freeiconspng.com/uploads/right-arrow-icon-27.png"
                        />
                    </div>
                    <div style={{ position: "relative" }}>
                        <img
                        style={{ width: "1140px", height: "540px" }}
                        src={sliderData[sliderIndex].src} 
                        alt="slider"
                        />
                        <p className="slider-text">{sliderData[sliderIndex].name}</p>
                    </div>
                    <div
                        style={{ width: "50px", height: "50px" }}
                        onClick={() => handleSlider("right")}
                    >
                        <img
                        style={{ width: "50px", height: "50px" }}
                        src="https://www.freeiconspng.com/uploads/right-arrow-icon-27.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slider