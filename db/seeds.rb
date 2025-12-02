UserSession.destroy_all
Session.destroy_all
Song.destroy_all
Playlist.destroy_all
User.destroy_all
puts "Création de l'utilisateur Admin de test..."
user = User.create!(
  email: "adil@adil.com",
  password: "password",
  pseudo: "testAdmin"
)
    # MIKE
    playlist_rock = Playlist.create!({title:"Rock", user: user})
    playlist_jazz = Playlist.create!({title:"Jazz", user: user})
    playlist_pop = Playlist.create!({title:"Pop", user: user})
    # LUDO
    playlist_rnb = Playlist.create!({title:"R'n'b", user: user})
    playlist_blues = Playlist.create!({title:"Blues", user: user})
    playlist_hiphop = Playlist.create!({title:"Hip Hop", user: user})
    # ADIL
    playlist_soul = Playlist.create!({title:"Soul", user: user})
    playlist_funk = Playlist.create!({title:"Funk", user: user})
    playlist_disco = Playlist.create!({title:"disco", user: user})
    # AXEL
    playlist_classic = Playlist.create!({title:"Classic", user: user})
    playlist_punk = Playlist.create!({title:"Punk", user: user})
    playlist_world = Playlist.create!({title:"World", user: user})

Song.create!(
  [
  playlist_hiphop = [
  { title: "Da Rockwilder", artist: "Method Man", youtube_url: "https://www.youtube.com/watch?v=WCYy8jpp7R8" },
  { title: "C.R.E.A.M.", artist: "Wu-Tang Clan", youtube_url: "https://www.youtube.com/watch?v=PBwAxmrE194" },
  { title: "Time 4 Sum Aksion", artist: "Redman", youtube_url: "https://www.youtube.com/watch?v=FMUcfbpcIeg&list=RDFMUcfbpcIeg&start_radio=1" },
  { title: "Woo Hah!! Got You All in Check", artist: "Busta Rhymes", youtube_url: "https://www.youtube.com/watch?v=EQzvQO2LcA4&list=RDEQzvQO2LcA4&start_radio=1" },
  { title: "The World Is Yours", artist: "Nas", youtube_url: "https://www.youtube.com/watch?v=e5PnuIRnJW8&list=RDe5PnuIRnJW8&start_radio=1" },
  { title: "Shook Ones Pt. II", artist: "Mobb Deep", youtube_url: "https://www.youtube.com/watch?v=yoYZf-lBF_U&list=RDyoYZf-lBF_U&start_radio=1" },
  { title: "Mass Appeal", artist: "Gang Starr", youtube_url: "https://www.youtube.com/watch?v=y9lNbNGbo24&list=RDy9lNbNGbo24&start_radio=1" },
  { title: "Guess Who's Back", artist: "Rakim", youtube_url: "https://www.youtube.com/watch?v=c7ilAD54Lqo&list=RDc7ilAD54Lqo&start_radio=1" },
  { title: "Nuthin’ But a “G” Thang", artist: "Dr. Dre", youtube_url: "https://www.youtube.com/watch?v=8GliyDgAGQI&list=RD8GliyDgAGQI&start_radio=1" },
  { title: "Scenario", artist: "A Tribe Called Quest", youtube_url: "https://www.youtube.com/watch?v=Q6TLWqn82J4&list=RDQ6TLWqn82J4&start_radio=1" }
]
  ]
)
  Song.create!(
    [
playlist_blues = [
  {title: "I'LL play the blues for you", artist:"daniel castro", youtube_url: "https://youtu.be/ioOzsi9aHQQ?si=mZapGXgcbBrWsqgi"},
  {title: "The sky is crying", artist:"gary B.B coleman", youtube_url: "https://youtu.be/71Gt46aX9Z4?si=_dLoMS6_zomDgWD9"},
  {title: "Make it rain", artist:"Foy Vance", youtube_url: "https://youtu.be/hD5hIqeKNVE?si=TwHPUBzPoAyI0rrE"},
  {title: "Slightly hung over", artist:"Blues Delight", youtube_url: "https://youtu.be/zq7hltwb_yc?si=qGknIRSKPMt7jeaC"},
  {title: "At Last", artist:"Etta James", youtube_url: "https://youtu.be/S-cbOl96RFM?si=4AXaAQP2p3BFFXUU"},
  {title: "Everyday I have The Blues", artist:"B.B king ", youtube_url: "https://youtu.be/xtwUqXCQvAI?si=VcDEj5ZZIBOvRAhx"},
  {title: "Stay Around A little Longer", artist:"Buddy Guy", youtube_url: "https://youtu.be/emyt-agLE_s?si=i0e8cxQ6W7XldEcZ"},
  {title: " Little Walter My Babe", artist:"Angel Neira", youtube_url: "https://youtu.be/duRp_avXtMM?si=D8yGcuSfkhfHDDKt"},
  {title: "Going Down", artist:"Freddie King", youtube_url: "https://youtu.be/V_ONyukSLqA?si=RtGUiGzL_dVKmIPH"},
  {title: "Yes We Can Can", artist:"Allen Toussaint", youtube_url: "https://youtu.be/ioOzsi9aHQQ?si=mZapGXgcbBrWsqgi"}
]
 ] )


puts "success"