/**
 * STEM Racing Season 9 - Team Proposal Form Builder
 * The British School New Delhi
 *
 * HOW TO USE
 * 1. Go to script.google.com and click New project.
 * 2. Delete everything in the editor and paste this whole file in.
 * 3. Set RUBRIC_URL below once you have uploaded the rubric PDF to Drive.
 * 4. Click Run. Approve the permission prompt (it is your own account).
 * 5. The execution log prints the live form link and the responses sheet link.
 * 6. Paste the live form link into the poster.
 */

// ============ EDIT THESE THREE LINES ============
var RUBRIC_URL   = 'PASTE_RUBRIC_DRIVE_LINK_HERE';
var CLOSING_DATE = '21 August 2026';
var RESTRICT_TO_SCHOOL_DOMAIN = true;   // true = only british-school.org accounts can respond
// ================================================

function createSeason9Form() {

  var form = FormApp.create('STEM Racing Season 9 - Team Proposal');

  form.setDescription(
    'Applications to join STEM Racing Season 9 at The British School New Delhi.\n\n' +
    'STEM Racing is the world\'s largest STEM competition. Teams design, manufacture and race a ' +
    'miniature compressed-air car, and run the team as a real engineering business.\n\n' +
    'ONE submission per team. Nominate a Team Manager to fill this in on behalf of everyone.\n\n' +
    'Read the rubric before you start, it tells you exactly what the panel is scoring:\n' + RUBRIC_URL + '\n\n' +
    'Applications close ' + CLOSING_DATE + '. Shortlisted teams will be invited to interview.'
  );

  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setAllowResponseEdits(true);
  form.setConfirmationMessage(
    'Proposal received. Shortlisted teams will be contacted by email for an interview. ' +
    'Questions: sonica.puri@british-school.org or reyansh.gupta@british-school.org'
  );

  if (RESTRICT_TO_SCHOOL_DOMAIN) {
    try { form.setRequireLogin(true); } catch (e) { Logger.log('Domain restriction unavailable on this account.'); }
  }

  // ---------- SECTION 1: TEAM ----------
  form.addSectionHeaderItem()
    .setTitle('1. Your team')
    .setHelpText('Teams must have between 3 and 6 members.');

  form.addTextItem()
    .setTitle('Team name')
    .setHelpText('Pick something you would be happy to see on a race gantry.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Team Manager (full name)')
    .setHelpText('The single point of contact for this application.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Team Manager school email')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());

  var members = ['Member 1', 'Member 2', 'Member 3', 'Member 4', 'Member 5', 'Member 6'];
  for (var i = 0; i < members.length; i++) {
    form.addTextItem()
      .setTitle(members[i] + (i < 3 ? '' : ' (optional)'))
      .setHelpText('Format: Full name, year group, school email')
      .setRequired(i < 3);
  }

  form.addPageBreakItem()
    .setTitle('2. Roles')
    .setHelpText('Every STEM Racing team covers these roles. Members can hold more than one.');

  form.addCheckboxGridItem()
    .setTitle('Who is covering which role?')
    .setRows(['Team Manager', 'Design Engineer', 'Manufacturing Engineer',
              'Graphic Designer', 'Resource and Sponsorship Manager'])
    .setColumns(['Member 1', 'Member 2', 'Member 3', 'Member 4', 'Member 5', 'Member 6'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Why is each person suited to their role?')
    .setHelpText('Around 150 words. Be specific. "He is good at art" scores nothing, "she runs the yearbook layout in InDesign" scores well.')
    .setRequired(true);

  // ---------- SECTION 3: MOTIVATION ----------
  form.addPageBreakItem()
    .setTitle('3. Motivation and understanding');

  form.addParagraphTextItem()
    .setTitle('Why does your team want to enter STEM Racing?')
    .setHelpText('Around 150 words.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('In your own words, what does a STEM Racing team actually have to produce over a season?')
    .setHelpText('Around 100 words. We are checking you know what you are signing up for.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('How did you first hear about STEM Racing?')
    .setChoiceValues(['School poster', 'Assembly or form time', 'A current or former team member',
                      'A teacher', 'Online', 'Other'])
    .showOtherOption(true)
    .setRequired(true);

  // ---------- SECTION 4: SKILLS ----------
  form.addPageBreakItem()
    .setTitle('4. Skills and evidence')
    .setHelpText('Nobody is expected to arrive knowing everything. Be honest, the panel would rather see willingness to learn than an inflated claim.');

  form.addCheckboxItem()
    .setTitle('Which of these does at least one person on your team have experience with?')
    .setChoiceValues([
      'CAD (Fusion 360)',
      'CAD (SolidWorks)',
      'CAD (other package)',
      'CFD or flow simulation',
      'CNC machining or workshop manufacturing',
      '3D printing',
      'Graphic design (Illustrator, Photoshop, Canva, InDesign)',
      'Video editing',
      'Programming',
      'Spreadsheets and budgeting',
      'Public speaking or presenting',
      'Writing formal documents or reports',
      'Social media or marketing',
      'None of the above yet'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Give one concrete example of something a team member has designed, built, organised or led.')
    .setHelpText('Around 100 words. It does not have to be engineering.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Link to a portfolio, sketches, CAD, design work or anything else you want the panel to see (optional)')
    .setHelpText('Paste a Google Drive link set to "Anyone at The British School with the link can view".');

  // ---------- SECTION 5: COMMITMENT ----------
  form.addPageBreakItem()
    .setTitle('5. Commitment')
    .setHelpText('This is the section teams most often underestimate. A season runs from now through to Nationals, and further if you qualify.');

  form.addMultipleChoiceItem()
    .setTitle('Can your whole team commit to a weekly after-school session for the full season?')
    .setChoiceValues(['Yes, all of us', 'Yes, most of us, with some clashes', 'No'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('List every other major commitment your members hold.')
    .setHelpText('Sports teams, MUN, DofE, music, Student Council, exams. Being busy is not a mark against you, hiding it is.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What will you do in the final six weeks before Nationals, when the workload peaks?')
    .setHelpText('Around 100 words.')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Honestly, how much time per week can your team average across the season?')
    .setBounds(1, 5)
    .setLabels('Under 2 hours', 'Over 8 hours')
    .setRequired(true);

  // ---------- SECTION 6: TEAMWORK ----------
  form.addPageBreakItem()
    .setTitle('6. Teamwork and resilience');

  form.addParagraphTextItem()
    .setTitle('How will you divide the work and keep track of who is doing what?')
    .setHelpText('Around 150 words.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('A member stops contributing three months in. What do you do?')
    .setHelpText('Around 100 words.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Two members disagree hard on a design decision and neither will move. How is it resolved?')
    .setHelpText('Around 100 words.')
    .setRequired(true);

  // ---------- SECTION 7: ENTERPRISE ----------
  form.addPageBreakItem()
    .setTitle('7. Enterprise')
    .setHelpText('Half of STEM Racing is running the team as a business. Sponsorship, budgeting, branding and marketing are judged as heavily as the car.');

  form.addParagraphTextItem()
    .setTitle('How would you go about raising sponsorship for your team?')
    .setHelpText('Around 150 words. Name the kinds of organisations you would approach and what you would offer them in return.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What is your team identity? Describe your brand in a few sentences.')
    .setHelpText('Name, colours, personality, the impression you want to leave on a judge.')
    .setRequired(true);

  // ---------- SECTION 8: DECLARATION ----------
  form.addPageBreakItem()
    .setTitle('8. Declaration');

  form.addCheckboxItem()
    .setTitle('Confirm the following')
    .setChoiceValues([
      'Every member listed has read this proposal and agrees to be part of the team',
      'Every member has read the rubric',
      'Our parents or guardians are aware of the time commitment involved',
      'We understand that only shortlisted teams will be invited to interview'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Anything else the panel should know? (optional)');

  // ---------- RESPONSES SHEET ----------
  var sheet = SpreadsheetApp.create('STEM Racing Season 9 - Proposal Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // ---------- OUTPUT ----------
  var live = form.getPublishedUrl();
  var edit = form.getEditUrl();
  Logger.log('=================================================');
  Logger.log('LIVE FORM (put this on the poster):');
  Logger.log(live);
  Logger.log('');
  Logger.log('SHORT LINK:');
  Logger.log(form.shortenFormUrl(live));
  Logger.log('');
  Logger.log('EDIT THE FORM:');
  Logger.log(edit);
  Logger.log('');
  Logger.log('RESPONSES SHEET:');
  Logger.log(sheet.getUrl());
  Logger.log('=================================================');
  Logger.log('Remember to add Ms Sonica Puri as an editor on both.');
}
