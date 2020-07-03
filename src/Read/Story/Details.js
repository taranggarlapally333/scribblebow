import React from 'react' ; 
import * as icons from 'react-icons/md';


function StoryDetails(props)
{
    var Details = "col-12 col-md-9  Details " ; 
    var shadow = "myshadow" ; 
    var currLoc = window.location.pathname;
    var firstprice = <h1 style={{color:"gold", }}><span className="glyphicon glyphicon-queen "></span></h1> ; 
    var LikeCommentAdd = <div id = "likeComment"className = "row container " style = {{width : 165}}>
    <div className= "box" style = {{color: "#E61D42"}}><icons.MdFavorite size="30"/></div>
    <div className= "box "  style = {{color: "blue"}}> <icons.MdComment  size="30" /></div>
    <div className= "box"> <icons.MdAdd size="30"/></div>
</div>  ; 
    return (
        <div>
            <div className = {currLoc =="Read/Story" ? Details+shadow : Details} >
                {currLoc =="/home" ? firstprice : null}
                <p style = {{fontSize:40}}>{props.title}</p>
                <div className= "row container">
                    <span class="badge bg-white border box">COMEDY</span>
                    <span class="badge bg-white border box">ROMANCE</span>
                    <span class="badge bg-white border box">ACTION</span>
                </div> 
                <hr />
                <p>Description: This is a Story of ......</p>
                <p>Rating : {props.rating} </p>
                <p>Hashtags: </p>
                <div className = "row container">
                    <span class="label label-danger box">#Story</span>
                    <span class="label label-warning box">#Story</span>
                    <span class="label label-primary box">#Story</span>
                    <span class="label label-info box">#Story</span>
                </div>
                {currLoc=="Read/Story"?LikeCommentAdd:null}
            </div>
        </div>
    ); 
}
function StoryContent()
{
    return (
        <div className = "StoryContent container" >
            <p>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Id faucibus nisl tincidunt eget nullam. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Neque viverra justo nec ultrices dui sapien.<br></br>
                Odio facilisis mauris sit amet massa. Hendrerit dolor magna eget est lorem. Lacus laoreet non curabitur gravida arcu ac. Leo urna molestie at elementum eu. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Sollicitudin ac orci phasellus egestas tellus. Enim facilisis gravida neque convallis a cras semper auctor. Urna id volutpat lacus laoreet non curabitur gravida arcu. Auctor eu augue ut lectus arcu bibendum at varius vel. Eget arcu dictum varius duis at consectetur lorem donec.  Aliquet nibh praesent tristique magna. At auctor urna nunc id cursus metus. Dolor purus non enim praesent.<br></br>
                Sed cras ornare arcu dui vivamus arcu felis bibendum. Viverra tellus in hac habitasse platea dictumst vestibulum. Neque ornare aenean euismod elementum nisi quis eleifend. Nibh nisl condimentum id venenatis a condimentum. Interdum velit euismod in pellentesque massa placerat duis ultricies lacus. Suspendisse in est ante in nibh mauris cursus. Sodales ut eu sem integer vitae justo eget. Scelerisque viverra mauris in aliquam sem fringilla ut.  Est velit egestas dui id. Neque convallis a cras semper auctor neque vitae. Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Amet justo donec enim diam vulputate. Id consectetur purus ut faucibus pulvinar elementum integer. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Risus nec feugiat in fermentum posuere. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Placerat vestibulum lectus mauris ultrices eros in cursus turpis. Elementum curabitur vitae nunc sed velit. Tristique magna sit amet purus gravida quis blandit turpis.  Cursus eget nunc scelerisque viverra mauris in aliquam sem. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Convallis convallis tellus id interdum. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Mauris a diam maecenas sed enim ut. Duis at consectetur lorem donec massa sapien faucibus. Sed augue lacus viverra vitae congue. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Sollicitudin tempor id eu nisl nunc mi. Bibendum est ultricies integer quis auctor elit sed vulputate. Commodo quis imperdiet massa tincidunt nunc. Lectus sit amet est placerat in egestas erat. Auctor augue mauris augue neque. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Risus in hendrerit gravida rutrum quisque non tellus orci ac. Consectetur adipiscing elit ut aliquam purus sit. Venenatis tellus in metus vulputate eu. Odio tempor orci dapibus ultrices in. Quam vulputate dignissim suspendisse in est.  Est placerat in egestas erat imperdiet. Gravida rutrum quisque non tellus orci ac auctor. Semper feugiat nibh sed pulvinar. Mauris rhoncus aenean vel elit scelerisque. Dictumst quisque sagittis purus sit amet. Amet dictum sit amet justo donec enim diam. Odio tempor orci dapibus ultrices in iaculis nunc sed augue. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Sed risus ultricies tristique nulla. Leo duis ut diam quam nulla porttitor massa id neque. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Magna sit amet purus gravida quis blandit turpis cursus. 
            </p>
        </div>
    ) ; 
}
function CoverPage(props)
{
    return (
        
            <div className= "col-md-3">
                <div class = "myshadow" style = {{width:160}}>
                <img src = {props.imageAddress} alt = "Cover " style = {{height:277}}></img>
                </div>
            </div>
        ); 
}

export default StoryDetails; 
export {StoryContent , StoryDetails , CoverPage}; 