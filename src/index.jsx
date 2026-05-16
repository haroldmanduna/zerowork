import { useState, useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const BG = "#0A0A0A";
const CARD = "#141414";
const GREEN = "#1DB954";

const ADMIN_CREDS = {
  email: "Haroldmanduna388@gmail.com",
  password: "ZeroWork@Admin2026#"
};

const CATEGORIES = [
  "Hair & Beauty","Health & Wellness","Technology","Food & Restaurant",
  "Retail & Fashion","Education","Construction","Legal & Finance",
  "Fitness","Photography","Transport","Other"
];

const COUNTRIES = [
  "Zimbabwe","South Africa","Kenya","Nigeria","Ghana","Uganda",
  "Tanzania","Ethiopia","Zambia","Botswana","Mozambique",
  "Senegal","Ivory Coast","Egypt","Morocco","Angola","DRC","Rwanda"
];

const SAMPLE_BUSINESSES = [
  {
    id:"1",name:"Amara Hair Studio",category:"Hair & Beauty",
    country:"Kenya",city:"Nairobi",
    description:"Premium salon specializing in natural African styles, braiding and modern cuts. We use only the finest products for your hair.",
    services:["Box Braids - $30","Natural Hair Treatment - $25","Haircut & Style - $20","Relaxer - $35","Weave Installation - $50"],
    hours:"Mon-Sat 8am-7pm",phone:"+254 712 345 678",email:"amara@hairstudio.co.ke",
    plan:"growth",rating:4.8,reviews:24,active:true,trialDays:0,
    bookings:[
      {id:"b1",customer:"Jane Moyo",service:"Box Braids",date:"2026-05-16",time:"10:00 AM",status:"confirmed"},
      {id:"b2",customer:"Aisha Kamau",service:"Weave Installation",date:"2026-05-17",time:"2:00 PM",status:"confirmed"}
    ]
  },
  {
    id:"2",name:"ChidiTech Repairs",category:"Technology",
    country:"Nigeria",city:"Lagos",
    description:"Fast and reliable phone, laptop and electronics repairs with genuine parts. Same-day service available.",
    services:["Phone Screen Repair - $15","Laptop Repair - $40","Data Recovery - $30","Software Fix - $10"],
    hours:"Mon-Sat 9am-6pm",phone:"+234 801 234 5678",email:"chidi@techrepairs.ng",
    plan:"premium",rating:4.6,reviews:38,active:true,trialDays:0,bookings:[]
  },
  {
    id:"3",name:"Zanele Wellness Spa",category:"Health & Wellness",
    country:"South Africa",city:"Johannesburg",
    description:"Holistic wellness center offering massage therapy, facials and body treatments in a tranquil environment.",
    services:["Full Body Massage - $45","Facial Treatment - $35","Manicure & Pedicure - $25","Aromatherapy - $50"],
    hours:"Tue-Sun 9am-8pm",phone:"+27 71 234 5678",email:"zanele@wellnessspa.co.za",
    plan:"growth",rating:4.9,reviews:52,active:true,trialDays:0,bookings:[]
  },
  {
    id:"4",name:"Kojo Fashion Studio",category:"Retail & Fashion",
    country:"Ghana",city:"Accra",
    description:"Custom Ankara and contemporary African fashion design and tailoring. Bringing your vision to life.",
    services:["Custom Dress - $60","Suit Tailoring - $80","Alterations - $15","Ankara Outfit - $45"],
    hours:"Mon-Fri 8am-6pm",phone:"+233 24 123 4567",email:"kojo@fashionstudio.gh",
    plan:"starter",rating:4.7,reviews:19,active:true,trialDays:22,bookings:[]
  }
];

function Stars({rating}){
  return(
    <span>
      <span style={{color:GOLD}}>{"★".repeat(Math.floor(rating))}{"☆".repeat(5-Math.floor(rating))}</span>
      <span style={{color:"#666",fontSize:"0.8em",marginLeft:4}}>{rating}</span>
    </span>
  );
}

function Badge({plan}){
  const colors={starter:"#4A9EFF",growth:GOLD,premium:"#C084FC",free_trial:GREEN};
  const c=colors[plan]||"#888";
  return(
    <span style={{
      background:c+"22",color:c,border:`1px solid ${c}44`,
      padding:"2px 10px",borderRadius:20,fontSize:"0.7em",fontWeight:700,textTransform:"uppercase"
    }}>{plan==="free_trial"?"Free Trial":plan}</span>
  );
}

function Navbar({onNavigate,businessLoggedIn,adminLoggedIn}){
  return(
    <nav style={{
      background:"#0D0D0D",borderBottom:`1px solid ${GOLD}22`,
      padding:"14px 20px",display:"flex",justifyContent:"space-between",
      alignItems:"center",position:"sticky",top:0,zIndex:100
    }}>
      <div onClick={()=>onNavigate("landing")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
        <div style={{
          width:32,height:32,background:`linear-gradient(135deg,${GOLD},#8B6914)`,
          borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",
          fontWeight:900,fontSize:"0.95em",color:"#000"
        }}>Z</div>
        <span style={{color:"white",fontWeight:800,fontSize:"1.05em"}}>
          <span style={{color:GOLD}}>Zero</span>Work
        </span>
      </div>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        {!businessLoggedIn&&!adminLoggedIn&&(
          <>
            <button onClick={()=>onNavigate("browse")} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:"0.875em"}}>Browse</button>
            <button onClick={()=>onNavigate("signup")} style={{
              background:GOLD,color:"#000",border:"none",padding:"8px 14px",
              borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:"0.8em"
            }}>List Business</button>
          </>
        )}
        {businessLoggedIn&&(
          <button onClick={()=>onNavigate("dashboard")} style={{
            background:GOLD,color:"#000",border:"none",padding:"8px 14px",
            borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:"0.8em"
          }}>Dashboard</button>
        )}
        {adminLoggedIn&&(
          <button onClick={()=>onNavigate("admin")} style={{
            background:"#C084FC",color:"#000",border:"none",padding:"8px 14px",
            borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:"0.8em"
          }}>Admin</button>
        )}
      </div>
    </nav>
  );
}

function LandingPage({onNavigate}){
  const features=[
    {icon:"🤖",title:"AI Agent Per Business",desc:"Every business gets their own AI that answers customers 24/7 with persistent memory"},
    {icon:"📅",title:"Smart Booking System",desc:"Customers book automatically. No double bookings ever. Calendar always synced."},
    {icon:"🔔",title:"Day-Before Reminders",desc:"Automatic reminders at 8am the day before every appointment. Cancellations reopen slots."},
    {icon:"📊",title:"Monthly Reports",desc:"Every business gets detailed monthly performance analytics sent automatically."},
    {icon:"🔗",title:"Unique Business Links",desc:"Every business gets a shareable link to advertise on WhatsApp, Facebook anywhere."},
    {icon:"🌍",title:"Pan-African Directory",desc:"Search businesses across all African countries by city, category and service type."}
  ];
  const plans=[
    {name:"Free Trial",price:"FREE",dur:"2 months",col:GREEN,feats:["Business Profile","AI Chat Agent","50 conversations/month","Basic Booking"]},
    {name:"Starter",price:"$10",dur:"/month",col:"#4A9EFF",feats:["Everything in Free","Email Notifications","Unique Business Link","Customer List"]},
    {name:"Growth",price:"$25",dur:"/month",col:GOLD,feats:["Unlimited AI Conversations","Automated Follow-ups","Monthly Reports","Reviews & Ratings"],pop:true},
    {name:"Premium",price:"$50",dur:"/month",col:"#C084FC",feats:["Priority Search Placement","Featured Gold Badge","Multi-Staff Booking","Advanced Analytics"]}
  ];
  return(
    <div style={{background:BG,minHeight:"100vh"}}>
      {/* Hero */}
      <div style={{padding:"70px 20px 50px",textAlign:"center",background:`radial-gradient(ellipse at center top,${GOLD}18 0%,transparent 65%)`}}>
        <div style={{display:"inline-block",background:`${GOLD}20`,border:`1px solid ${GOLD}44`,borderRadius:20,padding:"5px 14px",marginBottom:20,color:GOLD,fontSize:"0.8em",fontWeight:600}}>
          🌍 Built For Africa
        </div>
        <h1 style={{color:"white",fontSize:"clamp(2em,8vw,3.2em)",fontWeight:900,margin:"0 0 16px",lineHeight:1.1}}>
          Your Business,<br/><span style={{color:GOLD}}>Always On.</span>
        </h1>
        <p style={{color:"#777",fontSize:"1em",maxWidth:460,margin:"0 auto 36px",lineHeight:1.7}}>
          ZeroWork gives every African business their own AI assistant that answers customers, takes bookings and sends reminders — automatically, while you sleep.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>onNavigate("signup")} style={{
            background:`linear-gradient(135deg,${GOLD},#8B6914)`,color:"#000",
            border:"none",padding:"14px 26px",borderRadius:12,fontWeight:800,fontSize:"1em",cursor:"pointer"
          }}>Start Free — 2 Months Free</button>
          <button onClick={()=>onNavigate("browse")} style={{
            background:"transparent",color:"white",border:`1px solid #333`,
            padding:"14px 26px",borderRadius:12,fontWeight:600,fontSize:"1em",cursor:"pointer"
          }}>Browse Businesses</button>
        </div>
        <p style={{color:"#444",fontSize:"0.8em",marginTop:14}}>No card needed • Pay via EcoCash • Cancel anytime</p>
      </div>

      {/* How It Works */}
      <div style={{padding:"50px 20px",maxWidth:860,margin:"0 auto"}}>
        <h2 style={{color:"white",textAlign:"center",fontSize:"1.7em",marginBottom:6,fontWeight:800}}>How It Works</h2>
        <p style={{color:"#555",textAlign:"center",marginBottom:40,fontSize:"0.9em"}}>Set up in 5 minutes. Works forever automatically.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
          {[
            {step:"01",title:"List Your Business",desc:"Add services, prices, hours and photos. Takes 5 minutes."},
            {step:"02",title:"AI Gets To Work",desc:"Your AI agent starts answering customers instantly, 24/7."},
            {step:"03",title:"Watch Bookings Come In",desc:"Appointments booked automatically. You get notified every time."}
          ].map(s=>(
            <div key={s.step} style={{background:CARD,borderRadius:14,padding:24,border:`1px solid #1e1e1e`}}>
              <div style={{color:GOLD,fontSize:"1.8em",fontWeight:900,marginBottom:10}}>{s.step}</div>
              <h3 style={{color:"white",margin:"0 0 6px",fontSize:"1em"}}>{s.title}</h3>
              <p style={{color:"#555",margin:0,lineHeight:1.6,fontSize:"0.875em"}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{padding:"50px 20px",background:"#0D0D0D"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <h2 style={{color:"white",textAlign:"center",fontSize:"1.7em",marginBottom:40,fontWeight:800}}>Everything Your Business Needs</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}>
            {features.map(f=>(
              <div key={f.title} style={{background:CARD,borderRadius:14,padding:22,border:`1px solid #1a1a1a`}}>
                <div style={{fontSize:"1.6em",marginBottom:10}}>{f.icon}</div>
                <h3 style={{color:"white",margin:"0 0 6px",fontSize:"0.95em",fontWeight:700}}>{f.title}</h3>
                <p style={{color:"#555",margin:0,fontSize:"0.85em",lineHeight:1.5}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div style={{padding:"50px 20px",maxWidth:960,margin:"0 auto"}}>
        <h2 style={{color:"white",textAlign:"center",fontSize:"1.7em",marginBottom:6,fontWeight:800}}>Simple Pricing</h2>
        <p style={{color:"#555",textAlign:"center",marginBottom:40,fontSize:"0.875em"}}>Start free. Upgrade when ready. Pay via EcoCash.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:16}}>
          {plans.map(p=>(
            <div key={p.name} style={{
              background:CARD,borderRadius:16,padding:22,
              border:p.pop?`2px solid ${GOLD}`:`1px solid #1e1e1e`,position:"relative"
            }}>
              {p.pop&&<div style={{
                position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",
                background:GOLD,color:"#000",padding:"3px 12px",borderRadius:20,
                fontSize:"0.7em",fontWeight:800,whiteSpace:"nowrap"
              }}>MOST POPULAR</div>}
              <div style={{color:p.col,fontSize:"0.8em",fontWeight:700,marginBottom:6,textTransform:"uppercase"}}>{p.name}</div>
              <div style={{color:"white",marginBottom:18}}>
                <span style={{fontSize:"1.8em",fontWeight:900}}>{p.price}</span>
                <span style={{color:"#555",fontSize:"0.8em"}}> {p.dur}</span>
              </div>
              <ul style={{listStyle:"none",padding:0,margin:"0 0 20px"}}>
                {p.feats.map(f=>(
                  <li key={f} style={{color:"#888",fontSize:"0.82em",padding:"3px 0",display:"flex",gap:8}}>
                    <span style={{color:GREEN}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={()=>onNavigate("signup")} style={{
                width:"100%",background:p.pop?`linear-gradient(135deg,${GOLD},#8B6914)`:"transparent",
                color:p.pop?"#000":p.col,border:`1px solid ${p.col}`,
                padding:"10px",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:"0.875em"
              }}>Get Started</button>
            </div>
          ))}
        </div>
        <p style={{color:"#333",textAlign:"center",marginTop:20,fontSize:"0.8em"}}>
          Pay via EcoCash: +263777441482 (ZeroWork) — Send amount, then enter your reference number
        </p>
      </div>

      {/* CTA */}
      <div style={{padding:"50px 20px",textAlign:"center",background:`linear-gradient(135deg,${GOLD}12,transparent)`}}>
        <h2 style={{color:"white",fontSize:"1.7em",fontWeight:800,marginBottom:14}}>Ready to put your business on autopilot?</h2>
        <p style={{color:"#555",marginBottom:28,fontSize:"0.9em"}}>Join businesses across Africa already using ZeroWork</p>
        <button onClick={()=>onNavigate("signup")} style={{
          background:`linear-gradient(135deg,${GOLD},#8B6914)`,color:"#000",
          border:"none",padding:"15px 32px",borderRadius:12,fontWeight:800,fontSize:"1em",cursor:"pointer"
        }}>Start Free Today 🚀</button>
      </div>

      {/* Footer */}
      <div style={{background:"#080808",padding:"26px 20px",textAlign:"center",borderTop:`1px solid #161616`}}>
        <div style={{color:"white",fontWeight:800,marginBottom:6}}>
          <span style={{color:GOLD}}>Zero</span>Work
        </div>
        <p style={{color:"#333",fontSize:"0.75em",margin:0}}>
          Built in Zimbabwe 🇿🇼 • Serving All of Africa •{" "}
          <span onClick={()=>onNavigate("adminLogin")} style={{cursor:"pointer",color:"#282828"}}>Admin</span>
        </p>
      </div>
    </div>
  );
}

function BrowsePage({businesses,onNavigate,onSelect}){
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("");
  const [country,setCountry]=useState("");

  const filtered=businesses.filter(b=>{
    const q=search.toLowerCase();
    return b.active&&
      (!search||(b.name.toLowerCase().includes(q)||b.category.toLowerCase().includes(q)||b.city.toLowerCase().includes(q)))&&
      (!cat||b.category===cat)&&
      (!country||b.country===country);
  });

  return(
    <div style={{background:BG,minHeight:"100vh",padding:"24px 20px"}}>
      <h1 style={{color:"white",fontSize:"1.5em",fontWeight:800,marginBottom:18}}>
        Find Businesses <span style={{color:GOLD}}>Across Africa</span>
      </h1>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search by name, category or city..."
          style={{background:CARD,border:`1px solid #2a2a2a`,borderRadius:10,padding:"12px 14px",color:"white",fontSize:"0.9em",width:"100%",boxSizing:"border-box"}}/>
        <div style={{display:"flex",gap:10}}>
          <select value={cat} onChange={e=>setCat(e.target.value)} style={{background:CARD,border:`1px solid #2a2a2a`,borderRadius:10,padding:"10px",color:cat?"white":"#555",flex:1,fontSize:"0.8em"}}>
            <option value="">All Categories</option>
            {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <select value={country} onChange={e=>setCountry(e.target.value)} style={{background:CARD,border:`1px solid #2a2a2a`,borderRadius:10,padding:"10px",color:country?"white":"#555",flex:1,fontSize:"0.8em"}}>
            <option value="">All Countries</option>
            {COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <p style={{color:"#444",fontSize:"0.8em",marginBottom:14}}>{filtered.length} businesses found</p>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {filtered.map(b=>(
          <div key={b.id} onClick={()=>{onSelect(b);onNavigate("profile");}}
            style={{background:CARD,borderRadius:14,padding:18,border:`1px solid #1e1e1e`,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div>
                <h3 style={{color:"white",margin:"0 0 3px",fontSize:"1em",fontWeight:700}}>{b.name}</h3>
                <p style={{color:GOLD,margin:0,fontSize:"0.75em"}}>{b.category}</p>
              </div>
              <Badge plan={b.plan}/>
            </div>
            <p style={{color:"#555",margin:"0 0 10px",fontSize:"0.82em",lineHeight:1.5}}>
              {b.description.substring(0,90)}...
            </p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#444",fontSize:"0.78em"}}>📍 {b.city}, {b.country}</span>
              <Stars rating={b.rating}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIChat({business}){
  const [msgs,setMsgs]=useState([
    {role:"assistant",content:`Hi! I'm the AI assistant for ${business.name}. I can answer questions about services, pricing, availability, and help you book an appointment. How can I help?`}
  ]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const endRef=useRef(null);

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  const send=async()=>{
    if(!input.trim()||loading)return;
    const userMsg={role:"user",content:input};
    const updated=[...msgs,userMsg];
    setMsgs(updated);
    setInput("");
    setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:`You are the AI assistant for ${business.name}, a ${business.category} in ${business.city}, ${business.country}.

Services: ${business.services.join(", ")}
Hours: ${business.hours}
Phone: ${business.phone}
Email: ${business.email}
About: ${business.description}

Current bookings: ${JSON.stringify(business.bookings||[])}

Instructions:
- Answer questions about this business ONLY
- Help customers book by collecting: name, service, preferred date and time
- Check existing bookings before confirming a slot
- If a slot is taken, suggest alternative times
- Be friendly, professional and concise
- Never make up information not provided above`,
          messages:updated.map(m=>({role:m.role,content:m.content}))
        })
      });
      const data=await res.json();
      setMsgs([...updated,{role:"assistant",content:data.content[0].text}]);
    }catch{
      setMsgs([...updated,{role:"assistant",content:"I'm having connection issues. Please call us directly at "+business.phone}]);
    }
    setLoading(false);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",height:380}}>
      <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{
              background:m.role==="user"?GOLD:"#1a1a1a",
              color:m.role==="user"?"#000":"white",
              padding:"10px 14px",borderRadius:12,maxWidth:"80%",fontSize:"0.85em",lineHeight:1.5
            }}>{m.content}</div>
          </div>
        ))}
        {loading&&<div style={{display:"flex",justifyContent:"flex-start"}}><div style={{background:"#1a1a1a",padding:"10px 14px",borderRadius:12,color:"#555",fontSize:"0.85em"}}>Typing...</div></div>}
        <div ref={endRef}/>
      </div>
      <div style={{padding:"10px 14px",borderTop:`1px solid #1e1e1e`,display:"flex",gap:10}}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Ask about services, book an appointment..."
          style={{flex:1,background:"#1a1a1a",border:`1px solid #2a2a2a`,borderRadius:10,padding:"10px 12px",color:"white",fontSize:"0.85em"}}/>
        <button onClick={send} disabled={loading||!input.trim()} style={{
          background:GOLD,color:"#000",border:"none",padding:"10px 16px",
          borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:"0.9em"
        }}>→</button>
      </div>
    </div>
  );
}

function BusinessProfile({business,onNavigate}){
  const [tab,setTab]=useState("info");
  if(!business)return null;
  return(
    <div style={{background:BG,minHeight:"100vh"}}>
      <div style={{background:`linear-gradient(135deg,${GOLD}18,transparent)`,padding:"26px 20px 20px",borderBottom:`1px solid #1a1a1a`}}>
        <button onClick={()=>onNavigate("browse")} style={{background:"none",border:"none",color:"#555",cursor:"pointer",marginBottom:14,fontSize:"0.82em"}}>← Back</button>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <h1 style={{color:"white",margin:"0 0 4px",fontSize:"1.4em",fontWeight:800}}>{business.name}</h1>
            <p style={{color:GOLD,margin:"0 0 8px",fontSize:"0.82em"}}>{business.category}</p>
            <Stars rating={business.rating}/>
            <span style={{color:"#444",fontSize:"0.75em",marginLeft:8}}>({business.reviews} reviews)</span>
          </div>
          <Badge plan={business.plan}/>
        </div>
        <p style={{color:"#444",fontSize:"0.78em",marginTop:10}}>📍 {business.city}, {business.country}</p>
      </div>

      <div style={{display:"flex",borderBottom:`1px solid #1a1a1a`}}>
        {[{id:"info",label:"ℹ️ Info"},{id:"services",label:"🛠 Services"},{id:"chat",label:"💬 AI Chat"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1,background:"none",border:"none",
            borderBottom:tab===t.id?`2px solid ${GOLD}`:"2px solid transparent",
            color:tab===t.id?GOLD:"#555",
            padding:"13px 6px",cursor:"pointer",fontWeight:600,fontSize:"0.8em"
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{padding:20}}>
        {tab==="info"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:CARD,borderRadius:12,padding:18,border:`1px solid #1e1e1e`}}>
              <h3 style={{color:GOLD,margin:"0 0 8px",fontSize:"0.8em",textTransform:"uppercase",letterSpacing:1}}>About</h3>
              <p style={{color:"#888",margin:0,lineHeight:1.6,fontSize:"0.875em"}}>{business.description}</p>
            </div>
            <div style={{background:CARD,borderRadius:12,padding:18,border:`1px solid #1e1e1e`}}>
              <h3 style={{color:GOLD,margin:"0 0 10px",fontSize:"0.8em",textTransform:"uppercase",letterSpacing:1}}>Contact & Hours</h3>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                <p style={{color:"#888",margin:0,fontSize:"0.875em"}}>🕐 {business.hours}</p>
                <p style={{color:"#888",margin:0,fontSize:"0.875em"}}>📞 {business.phone}</p>
                <p style={{color:"#888",margin:0,fontSize:"0.875em"}}>✉️ {business.email}</p>
              </div>
            </div>
          </div>
        )}
        {tab==="services"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {business.services.map(s=>{
              const parts=s.split(" - ");
              return(
                <div key={s} style={{background:CARD,borderRadius:12,padding:"14px 18px",border:`1px solid #1e1e1e`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{color:"white",fontSize:"0.875em"}}>{parts[0]}</span>
                  <span style={{color:GOLD,fontWeight:700,fontSize:"0.9em"}}>{parts[1]||""}</span>
                </div>
              );
            })}
            <button onClick={()=>setTab("chat")} style={{
              background:`linear-gradient(135deg,${GOLD},#8B6914)`,color:"#000",
              border:"none",padding:"13px",borderRadius:12,fontWeight:800,cursor:"pointer",marginTop:6,fontSize:"0.9em"
            }}>Book via AI Chat →</button>
          </div>
        )}
        {tab==="chat"&&(
          <div style={{background:CARD,borderRadius:12,border:`1px solid #1e1e1e`,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid #1e1e1e`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:8,height:8,background:GREEN,borderRadius:"50%"}}/>
              <span style={{color:"white",fontSize:"0.82em",fontWeight:600}}>AI Assistant — Online 24/7</span>
            </div>
            <AIChat business={business}/>
          </div>
        )}
      </div>
    </div>
  );
}

function BusinessSignup({onNavigate,onSignup}){
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({name:"",category:"",country:"Zimbabwe",city:"",description:"",services:"",hours:"",phone:"",email:"",password:""});
  const upd=(k,v)=>setForm(p=>({...p,[k]:v}));

  const submit=()=>{
    const b={
      id:Date.now().toString(),...form,
      services:form.services.split("\n").filter(s=>s.trim()),
      plan:"free_trial",rating:0,reviews:0,active:true,trialDays:60,bookings:[]
    };
    onSignup(b);
    onNavigate("dashboard");
  };

  const inp={width:"100%",background:CARD,border:`1px solid #2a2a2a`,borderRadius:10,padding:"12px 14px",color:"white",fontSize:"0.875em",boxSizing:"border-box"};
  const lbl={color:"#666",fontSize:"0.78em",marginBottom:5,display:"block"};

  return(
    <div style={{background:BG,minHeight:"100vh",padding:"28px 20px"}}>
      <h1 style={{color:"white",fontSize:"1.4em",fontWeight:800,marginBottom:4}}>List Your Business</h1>
      <p style={{color:"#555",marginBottom:24,fontSize:"0.82em"}}>Step {step} of 2 • Free for 2 months, no card needed</p>
      <div style={{display:"flex",gap:8,marginBottom:28}}>
        {[1,2].map(s=><div key={s} style={{flex:1,height:4,borderRadius:4,background:s<=step?GOLD:"#1e1e1e"}}/>)}
      </div>

      {step===1&&(
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div><label style={lbl}>Business Name *</label><input value={form.name} onChange={e=>upd("name",e.target.value)} placeholder="e.g. Amara Hair Studio" style={inp}/></div>
          <div><label style={lbl}>Category *</label>
            <select value={form.category} onChange={e=>upd("category",e.target.value)} style={inp}>
              <option value="">Select category</option>
              {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{display:"flex",gap:12}}>
            <div style={{flex:1}}><label style={lbl}>Country *</label>
              <select value={form.country} onChange={e=>upd("country",e.target.value)} style={inp}>
                {COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{flex:1}}><label style={lbl}>City *</label><input value={form.city} onChange={e=>upd("city",e.target.value)} placeholder="Harare" style={inp}/></div>
          </div>
          <div><label style={lbl}>Description *</label><textarea value={form.description} onChange={e=>upd("description",e.target.value)} placeholder="Tell customers about your business..." rows={3} style={{...inp,resize:"none"}}/></div>
          <button onClick={()=>setStep(2)} disabled={!form.name||!form.category||!form.city} style={{
            background:`linear-gradient(135deg,${GOLD},#8B6914)`,color:"#000",border:"none",
            padding:"14px",borderRadius:12,fontWeight:800,cursor:"pointer",fontSize:"0.9em",
            opacity:(!form.name||!form.category||!form.city)?0.4:1
          }}>Continue →</button>
        </div>
      )}

      {step===2&&(
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div><label style={lbl}>Services & Prices (one per line) *</label><textarea value={form.services} onChange={e=>upd("services",e.target.value)} placeholder={"Box Braids - $30\nHaircut - $15\nRelaxer - $35"} rows={4} style={{...inp,resize:"none"}}/></div>
          <div><label style={lbl}>Working Hours *</label><input value={form.hours} onChange={e=>upd("hours",e.target.value)} placeholder="Mon-Sat 8am-6pm" style={inp}/></div>
          <div><label style={lbl}>Phone *</label><input value={form.phone} onChange={e=>upd("phone",e.target.value)} placeholder="+263 77 123 4567" style={inp}/></div>
          <div><label style={lbl}>Email *</label><input value={form.email} onChange={e=>upd("email",e.target.value)} placeholder="your@email.com" style={inp}/></div>
          <div><label style={lbl}>Password *</label><input type="password" value={form.password} onChange={e=>upd("password",e.target.value)} placeholder="Create a secure password" style={inp}/></div>
          <div style={{background:`${GREEN}15`,border:`1px solid ${GREEN}33`,borderRadius:12,padding:16}}>
            <p style={{color:GREEN,margin:"0 0 4px",fontSize:"0.85em",fontWeight:700}}>🎉 2 months completely free!</p>
            <p style={{color:"#555",margin:0,fontSize:"0.78em"}}>No payment needed. After trial, pay via EcoCash: +263777441482</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setStep(1)} style={{background:"none",color:"#555",border:`1px solid #2a2a2a`,padding:"14px",borderRadius:12,fontWeight:600,cursor:"pointer",flex:1,fontSize:"0.875em"}}>← Back</button>
            <button onClick={submit} style={{background:`linear-gradient(135deg,${GOLD},#8B6914)`,color:"#000",border:"none",padding:"14px",borderRadius:12,fontWeight:800,cursor:"pointer",flex:2,fontSize:"0.9em"}}>Launch Business 🚀</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BusinessDashboard({business,onNavigate}){
  const [sec,setSec]=useState("overview");
  const [copied,setCopied]=useState(false);
  if(!business)return null;

  const link=`zerowork.app/business/${business.name.toLowerCase().replace(/\s+/g,"-")}`;
  const copyLink=()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);};

  return(
    <div style={{background:BG,minHeight:"100vh"}}>
      <div style={{background:"#0D0D0D",padding:"18px 20px",borderBottom:`1px solid #1a1a1a`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <h2 style={{color:"white",margin:"0 0 4px",fontSize:"1.05em",fontWeight:800}}>{business.name}</h2>
            <Badge plan={business.plan}/>
          </div>
          {business.trialDays>0&&(
            <div style={{background:`${GREEN}18`,border:`1px solid ${GREEN}33`,borderRadius:10,padding:"8px 12px",textAlign:"center"}}>
              <div style={{color:GREEN,fontWeight:900,fontSize:"1.1em"}}>{business.trialDays}</div>
              <div style={{color:"#444",fontSize:"0.68em"}}>days left</div>
            </div>
          )}
        </div>
      </div>

      <div style={{display:"flex",overflowX:"auto",background:"#0D0D0D",borderBottom:`1px solid #1a1a1a`}}>
        {[{id:"overview",l:"Overview"},{id:"bookings",l:"Bookings"},{id:"link",l:"My Link"},{id:"upgrade",l:"Upgrade"}].map(n=>(
          <button key={n.id} onClick={()=>setSec(n.id)} style={{
            background:"none",border:"none",
            borderBottom:sec===n.id?`2px solid ${GOLD}`:"2px solid transparent",
            color:sec===n.id?GOLD:"#555",
            padding:"12px 16px",cursor:"pointer",fontWeight:600,fontSize:"0.78em",whiteSpace:"nowrap"
          }}>{n.l}</button>
        ))}
      </div>

      <div style={{padding:20}}>
        {sec==="overview"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {l:"Bookings",v:business.bookings?.length||0,i:"📅"},
                {l:"AI Chats",v:0,i:"💬"},
                {l:"Rating",v:business.rating||"—",i:"⭐"},
                {l:"Reviews",v:business.reviews||0,i:"💬"}
              ].map(s=>(
                <div key={s.l} style={{background:CARD,borderRadius:12,padding:16,border:`1px solid #1e1e1e`}}>
                  <div style={{fontSize:"1.2em",marginBottom:4}}>{s.i}</div>
                  <div style={{color:"white",fontSize:"1.4em",fontWeight:900}}>{s.v}</div>
                  <div style={{color:"#444",fontSize:"0.72em"}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{background:CARD,borderRadius:12,padding:18,border:`1px solid #1e1e1e`}}>
              <h3 style={{color:GOLD,margin:"0 0 10px",fontSize:"0.8em",textTransform:"uppercase"}}>Your Services</h3>
              {(Array.isArray(business.services)?business.services:[]).map(s=>(
                <p key={s} style={{color:"#777",margin:"4px 0",fontSize:"0.85em"}}>• {s}</p>
              ))}
            </div>
          </div>
        )}
        {sec==="bookings"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <h3 style={{color:"white",margin:"0 0 4px",fontWeight:700}}>All Bookings</h3>
            {(!business.bookings||business.bookings.length===0)?(
              <div style={{background:CARD,borderRadius:12,padding:30,textAlign:"center",border:`1px solid #1e1e1e`}}>
                <p style={{color:"#444",margin:0,fontSize:"0.875em"}}>No bookings yet. Share your link to get customers!</p>
              </div>
            ):business.bookings.map(b=>(
              <div key={b.id} style={{background:CARD,borderRadius:12,padding:14,border:`1px solid #1e1e1e`}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <strong style={{color:"white",fontSize:"0.875em"}}>{b.customer}</strong>
                  <span style={{color:GREEN,fontSize:"0.78em",fontWeight:600}}>{b.status}</span>
                </div>
                <p style={{color:"#555",margin:"4px 0 0",fontSize:"0.78em"}}>{b.service} • {b.date} at {b.time}</p>
              </div>
            ))}
          </div>
        )}
        {sec==="link"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:CARD,borderRadius:12,padding:20,border:`1px solid #1e1e1e`}}>
              <h3 style={{color:GOLD,margin:"0 0 10px",fontSize:"0.8em",textTransform:"uppercase"}}>Your Unique Business Link</h3>
              <div style={{background:"#111",borderRadius:10,padding:"12px 14px",border:`1px solid #2a2a2a`,marginBottom:12}}>
                <code style={{color:GOLD,fontSize:"0.78em"}}>{link}</code>
              </div>
              <button onClick={copyLink} style={{
                width:"100%",background:copied?GREEN:GOLD,color:"#000",
                border:"none",padding:"12px",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:"0.9em"
              }}>{copied?"✓ Copied!":"Copy Link"}</button>
            </div>
            <p style={{color:"#333",fontSize:"0.78em",textAlign:"center"}}>Share on WhatsApp, Facebook, TikTok or anywhere</p>
          </div>
        )}
        {sec==="upgrade"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:`${GOLD}12`,border:`1px solid ${GOLD}22`,borderRadius:12,padding:20}}>
              <h3 style={{color:GOLD,margin:"0 0 6px"}}>Upgrade Your Plan</h3>
              <p style={{color:"#666",margin:"0 0 16px",fontSize:"0.875em"}}>Send payment via EcoCash to upgrade instantly</p>
              <div style={{background:BG,borderRadius:10,padding:16,border:`1px solid #2a2a2a`,marginBottom:16}}>
                <p style={{color:"white",margin:"0 0 4px",fontWeight:700,fontSize:"0.9em"}}>EcoCash Payment</p>
                <p style={{color:GOLD,margin:"0 0 4px",fontWeight:700}}>+263777441482 (ZeroWork)</p>
                <p style={{color:"#444",margin:0,fontSize:"0.78em"}}>Send amount → enter reference number → contact support</p>
              </div>
              {[{n:"Starter",p:"$10/mo"},{n:"Growth",p:"$25/mo"},{n:"Premium",p:"$50/mo"}].map(p=>(
                <div key={p.n} style={{background:"#111",borderRadius:10,padding:"12px 16px",border:`1px solid #222`,display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{color:"white",fontWeight:600,fontSize:"0.875em"}}>{p.n}</span>
                  <span style={{color:GOLD,fontWeight:700}}>{p.p}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminLogin({onLogin}){
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");

  const login=()=>{
    if(email===ADMIN_CREDS.email&&pass===ADMIN_CREDS.password){onLogin();}
    else{setErr("Invalid credentials. Please try again.");}
  };

  return(
    <div style={{background:BG,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:CARD,borderRadius:20,padding:32,width:"100%",maxWidth:380,border:`1px solid #222`}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:48,height:48,background:`linear-gradient(135deg,${GOLD},#8B6914)`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontWeight:900,fontSize:"1.3em",color:"#000"}}>Z</div>
          <h2 style={{color:"white",margin:"0 0 4px",fontWeight:800}}>Admin Access</h2>
          <p style={{color:"#444",margin:0,fontSize:"0.82em"}}>ZeroWork Control Panel</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            placeholder="Admin email"
            style={{background:"#111",border:`1px solid ${err?"#ff4444":"#2a2a2a"}`,borderRadius:10,padding:"12px 14px",color:"white",fontSize:"0.875em"}}/>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)}
            placeholder="Password" onKeyDown={e=>e.key==="Enter"&&login()}
            style={{background:"#111",border:`1px solid ${err?"#ff4444":"#2a2a2a"}`,borderRadius:10,padding:"12px 14px",color:"white",fontSize:"0.875em"}}/>
          {err&&<p style={{color:"#ff4444",margin:0,fontSize:"0.78em"}}>{err}</p>}
          <button onClick={login} style={{
            background:`linear-gradient(135deg,${GOLD},#8B6914)`,color:"#000",
            border:"none",padding:"14px",borderRadius:12,fontWeight:800,cursor:"pointer",fontSize:"0.9em"
          }}>Login to Admin Panel</button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({businesses,onActivate,onDeactivate,onNavigate}){
  const [sec,setSec]=useState("overview");
  const [admins,setAdmins]=useState([
    {id:1,name:"Harold Manduna",email:"Haroldmanduna388@gmail.com",role:"super"}
  ]);
  const [adding,setAdding]=useState(false);
  const [newAdmin,setNewAdmin]=useState({name:"",email:"",password:"",role:"sales"});
  const [payments,setPayments]=useState([
    {id:"p1",business:"Demo Salon",ref:"ECO789456",amount:"$25",plan:"Growth",status:"pending"}
  ]);

  const inp={background:"#111",border:`1px solid #2a2a2a`,borderRadius:10,padding:"10px 12px",color:"white",fontSize:"0.82em",width:"100%",boxSizing:"border-box"};

  const addAdmin=()=>{
    setAdmins([...admins,{id:Date.now(),...newAdmin}]);
    setNewAdmin({name:"",email:"",password:"",role:"sales"});
    setAdding(false);
  };

  const navs=[
    {id:"overview",l:"📊 Overview"},
    {id:"businesses",l:"🏢 Businesses"},
    {id:"payments",l:"💳 Payments"},
    {id:"admins",l:"👥 Admins"},
    {id:"analytics",l:"📈 Analytics"}
  ];

  return(
    <div style={{background:BG,minHeight:"100vh"}}>
      <div style={{background:"#0D0D0D",padding:"16px 20px",borderBottom:`1px solid ${GOLD}22`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h2 style={{color:GOLD,margin:0,fontSize:"0.95em",fontWeight:800}}>Admin Panel</h2>
          <p style={{color:"#333",margin:0,fontSize:"0.72em"}}>ZeroWork Platform Analytics</p>
        </div>
        <button onClick={()=>onNavigate("landing")} style={{background:"none",border:`1px solid #2a2a2a`,color:"#555",padding:"6px 12px",borderRadius:8,cursor:"pointer",fontSize:"0.72em"}}>← Exit</button>
      </div>

      <div style={{display:"flex",overflowX:"auto",background:"#0D0D0D",borderBottom:`1px solid #1a1a1a`}}>
        {navs.map(n=>(
          <button key={n.id} onClick={()=>setSec(n.id)} style={{
            background:"none",border:"none",
            borderBottom:sec===n.id?`2px solid ${GOLD}`:"2px solid transparent",
            color:sec===n.id?GOLD:"#444",
            padding:"12px 14px",cursor:"pointer",fontWeight:600,fontSize:"0.72em",whiteSpace:"nowrap"
          }}>{n.l}</button>
        ))}
      </div>

      <div style={{padding:20}}>
        {sec==="overview"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {l:"Total Businesses",v:businesses.length,sub:`${businesses.filter(b=>b.active).length} active`,i:"🏢",c:GOLD,s:"businesses"},
                {l:"Total Bookings",v:businesses.reduce((s,b)=>s+(b.bookings?.length||0),0),sub:"All time",i:"📅",c:GREEN,s:"analytics"},
                {l:"AI Conversations",v:0,sub:"All time",i:"💬",c:"#4A9EFF",s:"analytics"},
                {l:"Total Revenue",v:`$${businesses.filter(b=>b.plan!=="free_trial"&&b.trialDays===0).length*20}`,sub:"Verified",i:"💳",c:"#C084FC",s:"payments"}
              ].map(s=>(
                <div key={s.l} onClick={()=>setSec(s.s)} style={{background:CARD,borderRadius:12,padding:16,border:`1px solid #1e1e1e`,cursor:"pointer"}}>
                  <div style={{fontSize:"1.3em",marginBottom:4}}>{s.i}</div>
                  <div style={{color:s.c,fontSize:"1.4em",fontWeight:900}}>{s.v}</div>
                  <div style={{color:"#aaa",fontSize:"0.75em",fontWeight:600}}>{s.l}</div>
                  <div style={{color:"#333",fontSize:"0.68em"}}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div style={{background:CARD,borderRadius:12,padding:18,border:`1px solid #1e1e1e`}}>
              <h3 style={{color:"white",margin:"0 0 14px",fontSize:"0.875em",fontWeight:700}}>Recent Business Signups</h3>
              {businesses.slice(0,5).map(b=>(
                <div key={b.id} onClick={()=>setSec("businesses")} style={{
                  display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"10px 0",borderBottom:`1px solid #161616`,cursor:"pointer"
                }}>
                  <div>
                    <p style={{color:"white",margin:0,fontSize:"0.85em",fontWeight:600}}>{b.name}</p>
                    <p style={{color:"#444",margin:0,fontSize:"0.72em"}}>{b.city}, {b.country}</p>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <Badge plan={b.plan}/>
                    <span style={{color:b.active?GREEN:"#ff4444",fontSize:"0.72em",fontWeight:600}}>
                      {b.active?"Active":"Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sec==="businesses"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <h3 style={{color:"white",margin:"0 0 4px",fontWeight:700}}>All Businesses ({businesses.length})</h3>
            {businesses.map(b=>(
              <div key={b.id} style={{background:CARD,borderRadius:12,padding:16,border:`1px solid #1e1e1e`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <strong style={{color:"white",fontSize:"0.875em"}}>{b.name}</strong>
                  <Badge plan={b.plan}/>
                </div>
                <p style={{color:"#444",margin:"0 0 10px",fontSize:"0.78em"}}>{b.city}, {b.country} • {b.email}</p>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>onActivate(b.id)} style={{background:`${GREEN}20`,color:GREEN,border:`1px solid ${GREEN}33`,padding:"6px 12px",borderRadius:8,fontSize:"0.75em",fontWeight:600,cursor:"pointer"}}>✓ Activate</button>
                  <button onClick={()=>onDeactivate(b.id)} style={{background:"#ff444418",color:"#ff4444",border:`1px solid #ff444433`,padding:"6px 12px",borderRadius:8,fontSize:"0.75em",fontWeight:600,cursor:"pointer"}}>✗ Deactivate</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {sec==="payments"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <h3 style={{color:"white",margin:"0 0 4px",fontWeight:700}}>Payment Verifications</h3>
            {payments.map(p=>(
              <div key={p.id} style={{background:CARD,borderRadius:12,padding:16,border:`1px solid #1e1e1e`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <strong style={{color:"white",fontSize:"0.875em"}}>{p.business}</strong>
                  <span style={{color:p.status==="approved"?GREEN:GOLD,fontSize:"0.78em",fontWeight:700}}>{p.status}</span>
                </div>
                <p style={{color:"#555",margin:"0 0 4px",fontSize:"0.8em"}}>Ref: <span style={{color:GOLD}}>{p.ref}</span></p>
                <p style={{color:"#555",margin:"0 0 12px",fontSize:"0.8em"}}>Plan: {p.plan} • {p.amount}</p>
                {p.status==="pending"&&(
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>setPayments(payments.map(x=>x.id===p.id?{...x,status:"approved"}:x))} style={{background:`${GREEN}20`,color:GREEN,border:`1px solid ${GREEN}33`,padding:"8px 16px",borderRadius:8,fontSize:"0.78em",fontWeight:600,cursor:"pointer"}}>✓ Approve</button>
                    <button onClick={()=>setPayments(payments.map(x=>x.id===p.id?{...x,status:"rejected"}:x))} style={{background:"#ff444418",color:"#ff4444",border:`1px solid #ff444433`,padding:"8px 16px",borderRadius:8,fontSize:"0.78em",fontWeight:600,cursor:"pointer"}}>✗ Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {sec==="admins"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <h3 style={{color:"white",margin:0,fontWeight:700}}>Admin Accounts</h3>
              <button onClick={()=>setAdding(true)} style={{background:`linear-gradient(135deg,${GOLD},#8B6914)`,color:"#000",border:"none",padding:"8px 14px",borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:"0.78em"}}>+ Add Admin</button>
            </div>
            {adding&&(
              <div style={{background:CARD,borderRadius:12,padding:18,border:`1px solid ${GOLD}33`}}>
                <h4 style={{color:GOLD,margin:"0 0 14px",fontSize:"0.85em"}}>New Admin Account</h4>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <input placeholder="Full Name" value={newAdmin.name} onChange={e=>setNewAdmin({...newAdmin,name:e.target.value})} style={inp}/>
                  <input placeholder="Email" value={newAdmin.email} onChange={e=>setNewAdmin({...newAdmin,email:e.target.value})} style={inp}/>
                  <input type="password" placeholder="Password" value={newAdmin.password} onChange={e=>setNewAdmin({...newAdmin,password:e.target.value})} style={inp}/>
                  <select value={newAdmin.role} onChange={e=>setNewAdmin({...newAdmin,role:e.target.value})} style={inp}>
                    <option value="sales">Sales Admin</option>
                    <option value="developer">Developer Admin</option>
                  </select>
                  <div style={{display:"flex",gap:10}}>
                    <button onClick={()=>setAdding(false)} style={{flex:1,background:"none",border:`1px solid #2a2a2a`,color:"#555",padding:"10px",borderRadius:8,cursor:"pointer",fontSize:"0.85em"}}>Cancel</button>
                    <button onClick={addAdmin} style={{flex:2,background:GOLD,color:"#000",border:"none",padding:"10px",borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:"0.85em"}}>Add Admin</button>
                  </div>
                </div>
              </div>
            )}
            {admins.map(a=>(
              <div key={a.id} style={{background:CARD,borderRadius:12,padding:16,border:`1px solid #1e1e1e`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <p style={{color:"white",margin:"0 0 3px",fontWeight:600,fontSize:"0.875em"}}>{a.name}</p>
                    <p style={{color:"#444",margin:0,fontSize:"0.72em"}}>{a.email}</p>
                  </div>
                  <span style={{
                    background:a.role==="super"?`${GOLD}20`:`${GREEN}20`,
                    color:a.role==="super"?GOLD:GREEN,
                    border:`1px solid ${a.role==="super"?GOLD:GREEN}33`,
                    padding:"3px 10px",borderRadius:20,fontSize:"0.68em",fontWeight:700,textTransform:"uppercase"
                  }}>{a.role}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {sec==="analytics"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <h3 style={{color:"white",margin:"0 0 4px",fontWeight:700}}>Platform Analytics</h3>
            {[
              {l:"Total Businesses",v:businesses.length,c:GOLD},
              {l:"Active Businesses",v:businesses.filter(b=>b.active).length,c:GREEN},
              {l:"On Free Trial",v:businesses.filter(b=>b.trialDays>0).length,c:"#4A9EFF"},
              {l:"Paying Customers",v:businesses.filter(b=>b.plan!=="free_trial"&&b.trialDays===0).length,c:"#C084FC"},
              {l:"Total Bookings",v:businesses.reduce((s,b)=>s+(b.bookings?.length||0),0),c:GOLD},
              {l:"Est. Monthly Revenue",v:`$${businesses.filter(b=>b.plan!=="free_trial"&&b.trialDays===0).length*20}`,c:GREEN}
            ].map(s=>(
              <div key={s.l} style={{background:CARD,borderRadius:12,padding:16,border:`1px solid #1e1e1e`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:"#666",fontSize:"0.875em"}}>{s.l}</span>
                <span style={{color:s.c,fontWeight:900,fontSize:"1em"}}>{s.v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App(){
  const [page,setPage]=useState("landing");
  const [businesses,setBusinesses]=useState(SAMPLE_BUSINESSES);
  const [selectedBiz,setSelectedBiz]=useState(null);
  const [loggedInBiz,setLoggedInBiz]=useState(null);
  const [adminLoggedIn,setAdminLoggedIn]=useState(false);

  const go=(p)=>setPage(p);

  const handleSignup=(b)=>{
    setBusinesses(prev=>[...prev,b]);
    setLoggedInBiz(b);
  };

  const showNav=page!=="adminLogin";

  return(
    <div style={{fontFamily:"'Segoe UI','DM Sans',sans-serif",maxWidth:480,margin:"0 auto",minHeight:"100vh",background:BG}}>
      {showNav&&page!=="admin"&&(
        <Navbar
          onNavigate={go}
          businessLoggedIn={!!loggedInBiz}
          adminLoggedIn={adminLoggedIn}
        />
      )}
      {page==="landing"&&<LandingPage onNavigate={go}/>}
      {page==="browse"&&<BrowsePage businesses={businesses} onNavigate={go} onSelect={setSelectedBiz}/>}
      {page==="profile"&&<BusinessProfile business={selectedBiz} onNavigate={go}/>}
      {page==="signup"&&<BusinessSignup onNavigate={go} onSignup={handleSignup}/>}
      {page==="dashboard"&&<BusinessDashboard business={loggedInBiz||businesses[0]} onNavigate={go}/>}
      {page==="adminLogin"&&<AdminLogin onLogin={()=>{setAdminLoggedIn(true);go("admin");}}/>}
      {page==="admin"&&adminLoggedIn&&(
        <AdminDashboard
          businesses={businesses}
          onActivate={(id)=>setBusinesses(p=>p.map(b=>b.id===id?{...b,active:true}:b))}
          onDeactivate={(id)=>setBusinesses(p=>p.map(b=>b.id===id?{...b,active:false}:b))}
          onNavigate={go}
        />
      )}
    </div>
  );
}
