// jQuery shortcuts
    var online = $('#jumbotron_online'),
        offline = $('#jumbotron_offline'),
        channel_banner = $('.channel_banner'),
        channel_logo = $('.channel_logo');



var channel_names = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var channel_ids = ["79776140", "30220059", "71852806", "90401618", "152475255", "6726509", "82534701", "54925078"];

// Generic banner click function to display associated channel stream and chat
channel_banner.click(function(){
    var id = $(this).attr('id');
    name = $(this).attr('name');

   $('[name="stream"]').attr('src','https://player.twitch.tv/?channel='+name+'&muted=true');
    $('[name="chat"]').attr('src','https://www.twitch.tv/'+name+'/chat');

});



// Stream Name to ID Conversion Request
function convert_username(arr){

    var i = 0;

    for(i; i < arr.length; i++){
        $.ajax({

            type: "GET",
            url: "https://api.twitch.tv/kraken/users?login="+arr[i],
            headers: {
                "Client-ID": "vaiynh6nnd2nxpf6wshnj4v4zxxqz2",
                "Accept": "application/vnd.twitchtv.v5+json"
            },

            success: function(data){
                // callback the status and details request function
                // passing the data (including ID) from this request
                status_details(data);
            }
        });
    }
}


// Stream Status and Details Request
function status_details(data) {

    // pulls ID attribute from convert_name data return which is passed to this request function
    var id = data.users[0]._id;

    $.ajax({

        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/" + id,
        headers: {
            "Client-ID": "vaiynh6nnd2nxpf6wshnj4v4zxxqz2",
            "Accept": "application/vnd.twitchtv.v5+json"
        },

        success: function (data) {
            // shortcut variables
            var stream = data.stream;

            if (stream !== null) {
                var channel = stream.channel,
                    name = channel.display_name,
                    banner = channel.profile_banner,
                    logo = channel.logo,
                    status = channel.status,
                    game = channel.game,
                    url = channel.url,
                    followers = channel.followers,
                    views = channel.views,
                    preview_image = stream.preview.small;

                online.append(
                    '<div class="jumbotron channel_banner" style="height: 100px;">' +
                    '<div class="channel_logo"></div>' +
                    '<div class="text-center" style="color:white; margin-top: 20px; left: 5px">' + name + '</div>' +
                    '</div>'
                );

                var channel_banner = $('.channel_banner');

                channel_banner.attr('id', id);
                    console.log(channel_banner.attr('id'));
                channel_banner.attr('name', name);
                    console.log(channel_banner.attr('name'));
                $('#'+id).css('background-image', 'url("'+banner+'")');




            }
            // if stream is offline / null returned
            else {
                offline.css('display', 'block');
                offline.append(
                    '<div class="jumbotron channel_banner" style="height: 100px;">' +
                    '<div class="channel_logo"></div>' +
                    '<div class="text-center" style="color:white; margin-top: 20px; left: 5px">' + 'OFFLINE' + '</div>' +
                    '</div>'
                );
            }

        }

    });

}






// Document Ready (execute on page load completion)
$( function(){
    convert_username(channel_names);
});