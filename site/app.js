'use strict';
const sourceLinks = {
  guide: ['Scrum Guide', 'https://scrumguides.org/scrum-guide.html'],
  planning: ['Scrum.org · Sprint Planning', 'https://www.scrum.org/resources/what-is-sprint-planning'],
  po: ['Scrum.org · Product Owner', 'https://www.scrum.org/resources/what-product-owner'],
  sm: ['Scrum.org · Scrum Master', 'https://www.scrum.org/resources/what-is-a-scrum-master'],
  backlog: ['Scrum.org · Sprint Backlog', 'https://www.scrum.org/resources/what-is-a-sprint-backlog'],
  pm: ['APM · Project Manager', 'https://www.apm.org.uk/jobs-and-careers/career-path/what-does-a-project-manager-do/'],
  pmi: ['PMI · Project management', 'https://www.pmi.org/about/what-is-project-management']
};
const situations = [
  { id: 'planning', name: 'Sprint planning', icon: 'calendar', tag: 'Shared · Scrum Team', title: 'A shared plan, with distinct decisions.',
    prompt: 'Your mobile team is planning the next sprint. The client wants five features, but the team sees capacity for three. Who decides what happens next?',
    pm: ['Contributes context', 'Shares milestones and external dependencies when invited. Aligns the broader delivery forecast with the plan.'],
    po: ['Clarifies value', 'Brings the most important items and explains their value. Collaborates on the Sprint Goal.'],
    sm: ['Enables the event', 'Helps planning stay productive and within its timebox; supports shared understanding.'],
    dev: 'Developers select achievable items through discussion with the PO and decide how to deliver them. The whole Scrum Team creates the Sprint Goal.',
    overlap: 'Agree on one goal, then make the capacity and dependencies visible. A delivery commitment should reflect the team’s forecast.',
    interview: 'I would bring the client’s constraints into planning, ask the PO to clarify the most valuable outcome, and use the Developers’ capacity assessment to agree a realistic plan. I would update delivery expectations from that evidence.', sources: ['planning'] },
  { id: 'priorities', name: 'Backlog prioritization', icon: 'list', tag: 'Accountable · Product Owner', title: 'Many inputs. One ordered backlog.',
    prompt: 'A client wants chat, support wants a crash fixed, and sales wants a new payment method. Who chooses what comes first?',
    pm: ['Supplies constraints', 'Surfaces contractual dates, dependencies, and project consequences to inform the decision.'],
    po: ['Accountable', 'Orders the Product Backlog to maximize value. Considers evidence and stakeholder needs.'],
    sm: ['Coaches the approach', 'Helps the PO find effective backlog management techniques and improve collaboration.'],
    dev: 'Developers provide technical insight and sizing; they may uncover a dependency that changes the options.',
    overlap: 'Compare user impact, urgency, effort, and dependencies together. Advice can be shared; accountability for ordering stays with the PO.',
    interview: 'I would make the trade-offs visible rather than treat the loudest request as the highest priority. The PO makes the ordering decision, informed by delivery constraints and technical evidence.', sources: ['po'] },
  { id: 'risks', name: 'Delivery risks', icon: 'flag', tag: 'Split · Project, product & technical risk', title: 'Risk ownership follows the impact.',
    prompt: 'An external API may arrive late and put the release at risk. Who coordinates the response, and who chooses the product trade-off?',
    pm: ['Coordinates project risk', 'Tracks schedule and cost exposure, coordinates external dependencies, and escalates within project governance.'],
    po: ['Decides value trade-offs', 'Weighs the user impact of delaying or reducing features and adjusts product priorities.'],
    sm: ['Enables transparency', 'Helps expose impediments and improve how the team responds to uncertainty.'],
    dev: 'Developers assess technical options and update their plan. No delivery forecast should bypass their feasibility input.',
    overlap: 'Name a practical owner for each response: vendor follow-up, a technical workaround, and a product decision. One shared risk log can support this; Scrum does not prescribe it.',
    interview: 'I would make the API dependency visible, agree a response owner and escalation trigger, and ask the team for feasible alternatives. The PO can compare their value; I would communicate the resulting delivery forecast.', sources: ['pm', 'pmi'] },
  { id: 'stakeholders', name: 'Stakeholder communication', icon: 'chat', tag: 'Shared · Different messages', title: 'The audience changes the conversation.',
    prompt: 'A sponsor asks for a delivery update while users ask whether a feature meets their needs. Who communicates, and about what?',
    pm: ['Project expectations', 'Coordinates delivery updates, decisions needed, and escalation through the agreed project channels.'],
    po: ['Product direction', 'Discusses needs and value, and connects feedback to product choices.'],
    sm: ['Facilitates collaboration', 'Helps stakeholders and the team collaborate effectively when needed.'],
    dev: 'The Scrum Team and stakeholders inspect the outcome together at the Sprint Review. Developers can explain what is usable and what they learned.',
    overlap: 'Use consistent evidence. A project update can show delivery exposure; a product conversation can explore outcomes. The Sprint Review is an adaptation session, not a status gate.',
    interview: 'I would tailor the conversation to the decision needed: delivery expectations with the sponsor, value with the PO and users, and technical evidence with the team. I would keep the messages consistent and invite direct collaboration.', sources: ['guide', 'po', 'sm', 'pmi'] },
  { id: 'blockers', name: 'Team blockers', icon: 'unlock', tag: 'Accountable · SM causes removal', title: 'Enable progress without taking over.',
    prompt: 'The team cannot test because environment access is missing. The same approval delay has happened in the last two sprints.',
    pm: ['External coordination', 'Can coordinate vendor or management escalation when the blockage falls within their remit.'],
    po: ['Clarifies impact', 'Helps assess affected value and discuss alternative product choices with the team.'],
    sm: ['Causes removal', 'Helps remove impediments and addresses the recurring system problem, supporting team self-management.'],
    dev: 'Developers surface the blockage, help resolve it where possible, and adapt their plan. They do not need to wait for a daily meeting to act.',
    overlap: 'Get access restored and improve the approval path. The SM need not fix every blocker personally; enlist whoever has the knowledge or authority.',
    interview: 'I would help the team restore access through the right escalation path, then work with the Scrum Master to address the repeating approval delay. I would support the team’s ownership of the solution rather than become its permanent gatekeeper.', sources: ['sm', 'backlog'] },
  { id: 'scope', name: 'Scope changes', icon: 'change', tag: 'Split · Product scope & project governance', title: 'Adapt the work. Protect the goal.',
    prompt: 'Mid-sprint, a client asks for another payment option. It may affect the Sprint Goal, cost, and a contractual launch date.',
    pm: ['Project change impact', 'Assesses the contractual, budget, and milestone effects and follows the organization’s approval process.'],
    po: ['Product trade-offs', 'Considers the request’s value and negotiates sprint scope with Developers as learning emerges.'],
    sm: ['Protects understanding', 'Helps everyone understand Scrum boundaries and collaborate on a useful response.'],
    dev: 'Developers assess feasibility and adapt the Sprint Backlog. Changes must not endanger the Sprint Goal or lower quality.',
    overlap: 'A project approval does not automatically add work to a sprint. Separate the product decision, the team’s plan, and any contract decision. Only the PO can cancel a Sprint if its goal is obsolete.',
    interview: 'I would assess the change with the PO and Developers before promising a date. If it fits the Sprint Goal, scope can be renegotiated. I would also handle any budget or contract implications through project governance.', sources: ['backlog', 'guide', 'pm'] }
];
const quizQuestions = [
  { id:'q1', category:'Backlog prioritization', scenario:'priorities', question:'Three stakeholders ask for different features. Who remains accountable for ordering the Product Backlog?', choices:['The Project Manager, because they track the timeline','The Product Owner, informed by stakeholders and the team','The Scrum Master, because they facilitate discussion','The stakeholders by majority vote'], correct:1, explanation:'The PO is the accountable product decision-maker. Other people provide important evidence without becoming a prioritization committee.', source:'po' },
  { id:'q2', category:'Sprint planning', scenario:'planning', question:'A PM promised six features, but Developers forecast three. What is the best next step?', choices:['The PM assigns the six features and extends working hours','The Scrum Master selects four as a compromise','The PO requires all six because they are highly valuable','The Scrum Team agrees a goal and feasible plan; the PM updates expectations'], correct:3, explanation:'Developers select the sprint work with the PO and determine the implementation plan. An external promise does not establish capacity.', source:'planning' },
  { id:'q3', category:'Delivery risks', scenario:'risks', question:'A vendor delay threatens budget and launch milestones. In a team with a delivery PM, who typically coordinates the project escalation?', choices:['The PM, with PO and technical input for the trade-offs','Only the Scrum Master, because all risks are impediments','Only the PO, because they order the backlog','Developers alone, without project stakeholders'], correct:0, explanation:'This is a practical organizational mapping: the PM coordinates project exposure within delegated authority. The PO and Developers inform the alternatives; authority depends on the organization.', source:'pm' },
  { id:'q4', category:'Team blockers', scenario:'blockers', question:'Repeated access approvals block testing. What best describes the Scrum Master’s accountability?', choices:['Personally solve every blocker before anyone else can act','Allocate access-related tasks to named Developers','Cause impediment removal and coach improvement of the system','Wait for the PO to approve removing the blocker'], correct:2, explanation:'The SM helps progress and effectiveness. That may mean coaching, facilitation, or enlisting management support rather than personally fixing the access system.', source:'sm' },
  { id:'q5', category:'Scope changes', scenario:'scope', question:'A new request arrives mid-sprint. It could fit without endangering the Sprint Goal. What is appropriate?', choices:['Reject it automatically because sprint scope can never change','PO and Developers discuss value and renegotiate scope as needed','The PM inserts it directly into the Sprint Backlog','Lower the quality standard to fit the additional work'], correct:1, explanation:'The Developers’ plan can evolve through discussion with the PO. Flexibility in exact work does not remove the Sprint Goal or quality boundary.', source:'backlog' },
  { id:'q6', category:'Stakeholder communication', scenario:'stakeholders', question:'A stakeholder treats the Sprint Review as a release approval meeting. What is the most accurate response?', choices:['The review exists only to report status to the PM','Only the PO should participate in the review','The Scrum Master signs off every release during the review','The review inspects outcomes and adapts; it is not a release gate'], correct:3, explanation:'Stakeholders collaborate with the Scrum Team on what has been learned and what to do next. Value can be released before the Sprint Review.', source:'guide' },
  { id:'q7', category:'Decision boundaries', scenario:'planning', question:'Who decides how selected Product Backlog items will be turned into a usable Increment?', choices:['The Developers doing the work','The Project Manager through task allocation','The PO through detailed implementation instructions','The Scrum Master through daily assignments'], correct:0, explanation:'Self-management includes the implementation approach. PM, PO, and SM contributions should support that expertise rather than replace it.', source:'planning' },
  { id:'q8', category:'Scope changes', scenario:'scope', question:'New evidence makes the Sprint Goal obsolete. Who has the authority to cancel the Sprint?', choices:['The PM because the project schedule changes','The Scrum Master because they manage the events','Only the Product Owner','Any stakeholder with a contractual deadline'], correct:2, explanation:'The PO has cancellation authority when the goal becomes obsolete. A project title or governance responsibility does not transfer that Scrum authority.', source:'guide' },
  { id:'q9', category:'Role boundaries', scenario:'blockers', question:'A manager calls the Scrum Master the “team’s task manager.” What is the best clarification?', choices:['Correct: the SM allocates and checks all sprint tasks','The SM enables effectiveness; Developers manage their sprint work','The SM and PO jointly assign all implementation tasks','The PM must become Scrum Master to assign sprint tasks'], correct:1, explanation:'The Scrum Master supports Scrum and team effectiveness. Developers maintain their own actionable plan; assigning all tasks would undermine that self-management.', source:'sm' },
  { id:'q10', category:'Project governance', scenario:'scope', question:'A change is valuable but exceeds the approved project budget. How should the roles collaborate?', choices:['The PO’s backlog decision automatically approves more budget','The SM approves funding to remove the constraint','The PM rejects all product changes unilaterally','PO assesses value, Developers assess feasibility, and PM coordinates the budget decision'], correct:3, explanation:'This is an example of separate decision boundaries. The organization’s authorized sponsor or governance body may approve funding; the PM coordinates within their authority.', source:'pmi' }
];
const paths = {
 calendar:'M4 5h16v16H4zM8 3v4m8-4v4M4 10h16m-12 4h2m4 0h2m-8 3h2',
 list:'M8 6h12M8 12h12M8 18h12M3 6h1m-1 6h1m-1 6h1',
 flag:'M5 22V3m0 1h13l-3 4 3 4H5',
 chat:'M4 5h16v12H9l-5 4V5zm4 5h8m-8 3h5',
 unlock:'M8 10V6a4 4 0 018 0m-11 8h14v11H5V10zm7 4v3',
 change:'M4 7h14l-3-3m3 3-3 3M20 17H6l3-3m-3 3 3 3'
};
const escapeHtml = value => String(value).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const linkHtml = key => `<a href="${sourceLinks[key][1]}" target="_blank" rel="noopener noreferrer">${sourceLinks[key][0]} ↗</a>`;
let activeSituation = 'planning';
const picker = document.getElementById('scenario-buttons');
picker.innerHTML = situations.map((s, i) => `<button class="situation-button" data-scenario="${s.id}" aria-pressed="${i===0}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[s.icon]}" stroke-linecap="round" stroke-linejoin="round"/></svg>${s.name}<span class="arrow" aria-hidden="true">→</span></button>`).join('') + '<p class="picker-caption">Lead ≠ work alone.<br>Shared work ≠ shared decision authority.</p>';
function renderSituation(id) {
  activeSituation=id;
  const s=situations.find(x=>x.id===id);
  if(!s)return;
  picker.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario===id)));
  const roles = [['pm','Project Manager'],['po','Product Owner'],['sm','Scrum Master']];
  document.getElementById('scenario-content').innerHTML = `
    <div class="scenario-top"><span class="scenario-count">SITUATION ${String(situations.indexOf(s)+1).padStart(2,'0')} / 06</span><span class="ownership-tag">${escapeHtml(s.tag)}</span></div>
    <h3 class="scenario-title">${escapeHtml(s.title)}</h3><p class="scenario-prompt">${escapeHtml(s.prompt)}</p>
    <div class="role-cards">${roles.map(([key,name])=>`<article class="role-card ${key}"><h4 class="role-heading"><span class="role-dot ${key}"></span>${name}</h4><span class="role-label">${escapeHtml(s[key][0])}</span><p>${escapeHtml(s[key][1])}</p></article>`).join('')}</div>
    <div class="developers-note"><span aria-hidden="true">↳</span><p><strong>The Developers’ part.</strong> ${escapeHtml(s.dev)}</p></div>
    <div class="collaboration-note"><strong>Where they overlap</strong><p>${escapeHtml(s.overlap)}</p></div>
    <div class="scenario-bottom"><details class="interview-details"><summary>How to explain it in an interview <span aria-hidden="true">+</span></summary><p>“${escapeHtml(s.interview)}”</p></details><p class="scenario-source">Study reference: ${s.sources.map(linkHtml).join(' · ')}</p></div>`;
  try { localStorage.setItem('role-studio-situation',id); } catch {}
}
picker.addEventListener('click',event=>{const button=event.target.closest('[data-scenario]');if(button)renderSituation(button.dataset.scenario);});
try{const saved=localStorage.getItem('role-studio-situation');if(situations.some(s=>s.id===saved))activeSituation=saved;}catch{}
renderSituation(activeSituation);
const STORAGE_KEY='role-studio-quiz-v1';
function freshState(ids=quizQuestions.map(q=>q.id)){return {version:1,ids,index:0,answers:{},complete:false};}
function restoreState(){
  try{
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(!parsed||parsed.version!==1||!Array.isArray(parsed.ids)||!parsed.ids.length||new Set(parsed.ids).size!==parsed.ids.length||!parsed.ids.every(id=>quizQuestions.some(q=>q.id===id))||!Number.isInteger(parsed.index)||parsed.index<0||parsed.index>=parsed.ids.length||typeof parsed.complete!=='boolean'||!parsed.answers||typeof parsed.answers!=='object')return freshState();
    for(const [id,answer] of Object.entries(parsed.answers)){if(!parsed.ids.includes(id)||!Number.isInteger(answer)||answer<0||answer>3)return freshState();}
    if(parsed.complete&&!parsed.ids.every(id=>Object.hasOwn(parsed.answers,id)))return freshState();
    return parsed;
  }catch{return freshState();}
}
let quizState=restoreState();
let selectedAnswer=null;
const quizEl=document.getElementById('quiz-content');
function persistQuiz(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(quizState));document.getElementById('saved-status').textContent='Your progress is saved in this browser.';}catch{document.getElementById('saved-status').textContent='Progress is available for this session.';}}
function score(){return quizState.ids.filter(id=>quizState.answers[id]===quizQuestions.find(q=>q.id===id).correct).length;}
function focusQuiz(){quizEl.setAttribute('tabindex','-1');quizEl.focus({preventScroll:true});}
function renderQuiz(){
  if(quizState.complete){renderComplete();return;}
  const q=quizQuestions.find(q=>q.id===quizState.ids[quizState.index]);
  const answered=Object.hasOwn(quizState.answers,q.id);
  const answer=quizState.answers[q.id];
  selectedAnswer=answered?answer:null;
  const right=answer===q.correct;
  const answeredCount=Object.keys(quizState.answers).length;
  quizEl.innerHTML=`<div class="quiz-meta"><strong>${quizState.ids.length<10?'REVIEW ROUND':'SCENARIO QUIZ'} · ${quizState.index+1} OF ${quizState.ids.length}</strong><span>${score()} correct / ${answeredCount} checked</span></div>
    <div class="quiz-progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${quizState.ids.length}" aria-valuenow="${answeredCount}"><span style="width:${answeredCount/quizState.ids.length*100}%"></span></div>
    <p class="quiz-category">${escapeHtml(q.category)}</p><h3 class="quiz-title" id="quiz-question">${escapeHtml(q.question)}</h3>
    <fieldset class="quiz-options" aria-labelledby="quiz-question"><legend class="sr-only">Choose one answer</legend>${q.choices.map((choice,i)=>`<label class="quiz-option ${answered?'locked':''} ${answered&&i===q.correct?'correct':''} ${answered&&i===answer&&!right?'incorrect':''}"><input type="radio" name="answer" value="${i}" ${answered&&i===answer?'checked':''} ${answered?'disabled':''}><span class="option-letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${escapeHtml(choice)}</span>${answered&&i===q.correct?'<span class="option-result">Best answer ✓</span>':answered&&i===answer?'<span class="option-result">Your choice</span>':''}</label>`).join('')}</fieldset>
    ${answered?`<div class="quiz-feedback ${right?'':'wrong'}"><h4>${right?'Correct — here’s the distinction.':'A useful distinction to remember.'}</h4><p>${escapeHtml(q.explanation)}</p>${linkHtml(q.source)}</div>`:''}
    <div class="quiz-actions"><button class="text-button" id="previous-question" ${quizState.index===0?'disabled':''}>← Previous</button>${answered?`<button class="next-button" id="next-question">${quizState.index===quizState.ids.length-1?'See results':'Next scenario →'}</button>`:'<button class="check-button" id="check-answer" disabled>Check answer</button>'}</div>`;
}
function renderComplete(){
  const missed=quizState.ids.filter(id=>quizState.answers[id]!==quizQuestions.find(q=>q.id===id).correct);
  const perfect=missed.length===0;
  quizEl.innerHTML=`<div class="quiz-complete"><span class="quiz-category">${quizState.ids.length<10?'REVIEW COMPLETE':'PRACTICE COMPLETE'}</span><span class="completed-check" aria-hidden="true">✓</span><div class="score-number">${score()}<span style="font-size:28px;color:#8a9980"> / ${quizState.ids.length}</span></div><h3>${perfect?'Clear boundaries. Confident answers.':'Good practice. Keep the distinctions clear.'}</h3><p>${perfect?'You found the best response in every scenario. Next, try explaining the decision and collaboration in your own words.':'Review the topics below, then retry the missed scenarios. The explanation matters as much as the score.'}</p>
  ${missed.length?`<div class="missed-list"><h4>TOPICS TO REVISIT</h4><ul>${missed.map(id=>{const q=quizQuestions.find(q=>q.id===id);return `<li><a href="#explore" data-review-scenario="${q.scenario}">${escapeHtml(q.category)} · ${escapeHtml(q.question)}</a></li>`;}).join('')}</ul></div>`:''}
  <div class="quiz-actions">${missed.length?'<button class="next-button" id="review-missed">Review missed scenarios</button>':'<a class="text-button" href="#explore">Explore interview answers ↗</a>'}<button class="text-button" id="restart-quiz">Try all 10 again</button></div><p class="quiz-mini-note">Practice score only — not a certification readiness assessment.</p></div>`;
}
quizEl.addEventListener('change',event=>{
  if(event.target.matches('input[name=answer]')){selectedAnswer=Number(event.target.value);document.getElementById('check-answer').disabled=false;}
});
quizEl.addEventListener('click',event=>{
  const button=event.target.closest('button');
  const link=event.target.closest('[data-review-scenario]');
  if(link){renderSituation(link.dataset.reviewScenario);return;}
  if(!button||button.disabled)return;
  if(button.id==='check-answer'&&selectedAnswer!==null){const id=quizState.ids[quizState.index];quizState.answers[id]=selectedAnswer;persistQuiz();renderQuiz();document.querySelector('.quiz-feedback').scrollIntoView({behavior:'smooth',block:'nearest'});focusQuiz();}
  if(button.id==='next-question'){if(quizState.index===quizState.ids.length-1){quizState.complete=true;}else{quizState.index++;}persistQuiz();renderQuiz();focusQuiz();}
  if(button.id==='previous-question'){quizState.index--;persistQuiz();renderQuiz();focusQuiz();}
  if(button.id==='restart-quiz'){quizState=freshState();persistQuiz();renderQuiz();focusQuiz();}
  if(button.id==='review-missed'){const ids=quizState.ids.filter(id=>quizState.answers[id]!==quizQuestions.find(q=>q.id===id).correct);quizState=freshState(ids);persistQuiz();renderQuiz();focusQuiz();}
});
renderQuiz();
if(Object.keys(quizState.answers).length)document.getElementById('saved-status').textContent='Your previous progress has been restored.';
const navLinks=[...document.querySelectorAll('nav a')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}}},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main>section').forEach(s=>observer.observe(s));}
