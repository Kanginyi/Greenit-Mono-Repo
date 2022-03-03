puts "🌱 Seeding Users data..."

User.destroy_all
Blog.destroy_all
Comment.destroy_all

alan_cinsavich = User.create(username: "AlanCinsavich", password: "Pleasecomeback")
unclaimed_yeti = User.create(username: "UnclaimedYeti", password: "Ilovemydogs")
pashovski = User.create(username: "Pashovski", password: "Pushoffme")
uncle_sam = User.create(username: "UncleSam", password: "USAUSAUSA")
xinyeet = User.create(username: "Xinyeet", password: "Weakkneesy")
quankerooskies = User.create(username: "Quankerooskies", password: "TWICEBLACKPINK")
sri_lankan_prince = User.create(username: "SriLankanPrince", password: "Apictureaday")
adam_goatson = User.create(username: "AdamGOATson", password: "Broadwaydotcom")

puts "🌱 Seeding blogs data..."
# Post 1
baby_come_back = Blog.create(user_id: alan_cinsavich.id, title: "Baby Come Back", blog_post: "I have to leave and I'm sorry guys. I can't tell you why, but please remember me fondly. Alan L. Cinsavich signing out.", likes: 0, dislikes: 99999)

# Post 2
meet_rusty = Blog.create(user_id: unclaimed_yeti.id, title: "Meet Rusty!", blog_post: "Here's a picture of Rusty, one of my dogs!", image_url: "https://i.imgur.com/vmueRNt.jpg", likes: 123, dislikes: 0)

# Post 3
meet_freya = Blog.create(user_id: unclaimed_yeti.id, title: "Meet Freya!", blog_post: "Here's a picture of Freya, one of my dogs!", image_url: "https://i.imgur.com/Ie10zAv.jpg", likes: 321, dislikes: 0)

# Post 4
daughters_first_birthday = Blog.create(user_id: pashovski.id, title: "It's My Daughter's First Birthday!", blog_post: "Hey guys, my daughter turned 1 recently! She's growing so fast already and being her father is so rewarding. I can't wait to share more updates!", likes: 540, dislikes: 0)

# Post 5
i_want_you = Blog.create(user_id: uncle_sam.id, title: "I Want YOU, to Run a Marathon With Me", blog_post: "I'm training to run a marathon right now. Everyone should start training now and meet me at the starting line :)", image_url: "https://wmimg.azureedge.net/public/img/marathons/marathon-de-montpellier/marathon-de-montpellier_5_marathon-de-montpellier.jpg?c=1574936301", likes: 3, dislikes: 69)

# Post 6
moose = Blog.create(user_id: xinyeet.id, title: "MOOSE", blog_post: "M O O O O O O O O O S E", image_url: "https://c.tenor.com/ivjojL502eQAAAAC/office-work-work.gif", likes: 222, dislikes: 0)

# Post 7
elon_musk = Blog.create(user_id: quankerooskies.id, title: "Elon Musk is My Dad", blog_post: "Elon Musk is my favorite person in the entire world. I love spending time with him as we fly around the Earth on our secret spaceship. I wish he would love me as much as he loves robots, but I'll deal with it for now.", likes: 1, dislikes: 1)

# Post 8
css = Blog.create(user_id: sri_lankan_prince.id, title: "CSS is Fun", blog_post: "CSS is amazing and really fun to play around with. Let's learn a little bit about CSS right now.", likes: 21, dislikes: 2)

# Post 9
questions = Blog.create(user_id: adam_goatson.id, title: "Questions??", blog_post: "Can y'all please stop asking 'Can I ask you a question?' If you have a question, just ask the question. It really grinds my gears when I have to spend some extra time asking you what the question is. This is also really important for other people when you work in the real world. Just ask the damn question.", image_url:"https://i.kym-cdn.com/entries/icons/original/000/018/489/nick-young-confused-face-300x256-nqlyaa.jpg", likes: 420, dislikes: 0)

puts "🌱 Seeding comments data..."
# Post 1
post1_comment1 = Comment.create(blog_id: baby_come_back.id, user_id: unclaimed_yeti.id, comment_text: "We miss you")
post1_comment2 = Comment.create(blog_id: baby_come_back.id, user_id: pashovski.id, comment_text: "You're my whole world")
post1_comment3 = Comment.create(blog_id: baby_come_back.id, user_id: uncle_sam.id, comment_text: "I want YOU, to come back")
post1_comment4 = Comment.create(blog_id: baby_come_back.id, user_id: xinyeet.id, comment_text: "Please come back")
post1_comment5 = Comment.create(blog_id: baby_come_back.id, user_id: quankerooskies.id, comment_text: "Please add me back on LinkedIn")
post1_comment6 = Comment.create(blog_id: baby_come_back.id, user_id: sri_lankan_prince.id, comment_text: "Wait, what's going on??")
post1_comment7 = Comment.create(blog_id: baby_come_back.id, user_id: adam_goatson.id, comment_text: "Good luck with whatever you do next!")

# Post 2
post2_comment1 = Comment.create(blog_id: meet_rusty.id, user_id: pashovski.id, comment_text: "How cute!")
post2_comment2 = Comment.create(blog_id: meet_rusty.id, user_id: uncle_sam.id, comment_text: "I want YOU, to let me borrow Rusty to run a marathon with me")
post2_comment3 = Comment.create(blog_id: meet_rusty.id, user_id: xinyeet.id, comment_text: "I love dogs so much :D")
post2_comment4 = Comment.create(blog_id: meet_rusty.id, user_id: quankerooskies.id, comment_text: "Should I try to make a dog robot?...")
post2_comment5 = Comment.create(blog_id: meet_rusty.id, user_id: sri_lankan_prince.id, comment_text: "RUSTY!!!")
post2_comment6 = Comment.create(blog_id: meet_rusty.id, user_id: adam_goatson.id, comment_text: "I have a question.")

# Post 3
post3_comment1 = Comment.create(blog_id: meet_freya.id, user_id: pashovski.id, comment_text: "How adorable!")
post3_comment2 = Comment.create(blog_id: meet_freya.id, user_id: uncle_sam.id, comment_text: "I want YOU, to let me pet Freya on the head.")
post3_comment3 = Comment.create(blog_id: meet_freya.id, user_id: xinyeet.id, comment_text: "Moose and Freya should hang out!!")
post3_comment4 = Comment.create(blog_id: meet_freya.id, user_id: xinyeet.id, comment_text: "OOH, and Rusty too!")
post3_comment5 = Comment.create(blog_id: meet_freya.id, user_id: quankerooskies.id, comment_text: "Why did you name her Freya?")
post3_comment6 = Comment.create(blog_id: meet_freya.id, user_id: sri_lankan_prince.id, comment_text: "FREYA!!!")
post3_comment7 = Comment.create(blog_id: meet_freya.id, user_id: adam_goatson.id, comment_text: "I have a question.")

# Post 4
post4_comment1 = Comment.create(blog_id: daughters_first_birthday.id, user_id: pashovski.id, comment_text: "Love you, baby!")
post4_comment2 = Comment.create(blog_id: daughters_first_birthday.id, user_id: unclaimed_yeti.id, comment_text: "Happy birthday!!")
post4_comment3 = Comment.create(blog_id: daughters_first_birthday.id, user_id: uncle_sam.id, comment_text: "I want YOU, to enjoy your daughter's birthday")
post4_comment4 = Comment.create(blog_id: daughters_first_birthday.id, user_id: xinyeet.id, comment_text: "YAAAAAAAAAAY!")
post4_comment5 = Comment.create(blog_id: daughters_first_birthday.id, user_id: quankerooskies.id, comment_text: "I will send a spaceship to your house, hold on")
post4_comment6 = Comment.create(blog_id: daughters_first_birthday.id, user_id: sri_lankan_prince.id, comment_text: "Congratulations!")
post4_comment7 = Comment.create(blog_id: daughters_first_birthday.id, user_id: adam_goatson.id, comment_text: "I have a question.")

# Post 5
post5_comment1 = Comment.create(blog_id: i_want_you.id, user_id: unclaimed_yeti.id, comment_text: "My parents run marathons too!")
post5_comment2 = Comment.create(blog_id: i_want_you.id, user_id: pashovski.id, comment_text: "I only know about the NY Marathon")
post5_comment3 = Comment.create(blog_id: i_want_you.id, user_id: xinyeet.id, comment_text: "I run everyday, but no way am I running a marathon :(")
post5_comment4 = Comment.create(blog_id: i_want_you.id, user_id: quankerooskies.id, comment_text: "What is running??")
post5_comment5 = Comment.create(blog_id: i_want_you.id, user_id: sri_lankan_prince.id, comment_text: "No.")
post5_comment6 = Comment.create(blog_id: i_want_you.id, user_id: adam_goatson.id, comment_text: "I have a question.")

# Post 6
post6_comment1 = Comment.create(blog_id: moose.id, user_id: unclaimed_yeti.id, comment_text: "DOG")
post6_comment2 = Comment.create(blog_id: moose.id, user_id: pashovski.id, comment_text: "CORGI")
post6_comment3 = Comment.create(blog_id: moose.id, user_id: uncle_sam.id, comment_text: "I want YOU, to take Moose to a dog park")
post6_comment4 = Comment.create(blog_id: moose.id, user_id: quankerooskies.id, comment_text: "Can I come hang out with your dog?")
post6_comment5 = Comment.create(blog_id: moose.id, user_id: sri_lankan_prince.id, comment_text: "MOOSE")
post6_comment6 = Comment.create(blog_id: moose.id, user_id: adam_goatson.id, comment_text: "I have a question.")

# Post 7
post7_comment1 = Comment.create(blog_id: elon_musk.id, user_id: unclaimed_yeti.id, comment_text: "Your dad's hella rich!")
post7_comment2 = Comment.create(blog_id: elon_musk.id, user_id: uncle_sam.id, comment_text: "I want YOUr dad, to take me to Mars")
post7_comment3 = Comment.create(blog_id: elon_musk.id, user_id: adam_goatson.id, comment_text: "I have a question.")

# Post 8
post8_comment1 = Comment.create(blog_id: css.id, user_id: unclaimed_yeti.id, comment_text: "Teach me about flexbox!")
post8_comment2 = Comment.create(blog_id: css.id, user_id: uncle_sam.id, comment_text: "I want YOU, to teach me more about CSS")
post8_comment3 = Comment.create(blog_id: css.id, user_id: xinyeet.id, comment_text: "Great article!!")
post8_comment4 = Comment.create(blog_id: css.id, user_id: quankerooskies.id, comment_text: "I miss being your partner")
post8_comment5 = Comment.create(blog_id: css.id, user_id: adam_goatson.id, comment_text: "I have a question.")

# Post 9
post9_comment1 = Comment.create(blog_id: questions.id, user_id: unclaimed_yeti.id, comment_text: "Can")
post9_comment2 = Comment.create(blog_id: questions.id, user_id: pashovski.id, comment_text: "I")
post9_comment3 = Comment.create(blog_id: questions.id, user_id: xinyeet.id, comment_text: "ask")
post9_comment4 = Comment.create(blog_id: questions.id, user_id: uncle_sam.id, comment_text: "YOU")
post9_comment5 = Comment.create(blog_id: questions.id, user_id: quankerooskies.id, comment_text: "a")
post9_comment6 = Comment.create(blog_id: questions.id, user_id: sri_lankan_prince.id, comment_text: "question?")
post9_comment7 = Comment.create(blog_id: questions.id, user_id: adam_goatson.id, comment_text: "I hate all of you.")


puts "✅ Done seeding!"