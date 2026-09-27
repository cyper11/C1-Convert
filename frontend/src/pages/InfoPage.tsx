import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  EyeOff,
  FileCheck,
  HeartHandshake,
  Lock,
  Scale,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck,
} from 'lucide-react';
import { Page } from '../components/Page';

interface InfoPageProps {
  kind: 'privacy' | 'terms' | 'ethics';
}

export function InfoPage({ kind }: InfoPageProps) {
  return (
    <Page>
      <div className="page-container info-page">
        <Link className="back-link" to="/tools">
          <ArrowLeft size={16} /> Back to all tools
        </Link>

        {/* Top Tab Navigation */}
        <div className="info-tabs">
          <Link
            to="/privacy"
            className={`info-tab ${kind === 'privacy' ? 'active' : ''}`}
          >
            <ShieldCheck size={18} />
            <span>Privacy Policy</span>
          </Link>
          <Link
            to="/terms"
            className={`info-tab ${kind === 'terms' ? 'active' : ''}`}
          >
            <Scale size={18} />
            <span>Terms of Service</span>
          </Link>
          <Link
            to="/ethics"
            className={`info-tab ${kind === 'ethics' ? 'active' : ''}`}
          >
            <HeartHandshake size={18} />
            <span>Ethical Considerations</span>
          </Link>
        </div>

        {/* =========================================================================
            1. ETHICAL CONSIDERATIONS
           ========================================================================= */}
        {kind === 'ethics' && (
          <div className="info-content-fade">
            <div className="info-hero">
              <span className="eyebrow">
                <Sparkles size={14} /> TRUST & ETHICS CHARTER
              </span>
              <h1>Ethical Considerations in Document Processing</h1>
              <p className="lead">
                Our uncompromising commitment to user autonomy, data dignity, zero AI model training,
                and transparent engineering.
              </p>
            </div>

            {/* Core Trust Highlights */}
            <div className="trust-cards-grid">
              <div className="trust-card">
                <div className="trust-card-icon blue">
                  <EyeOff size={26} />
                </div>
                <h3>Zero AI Training</h3>
                <p>
                  Your documents, spreadsheets, and scanned PDFs are <strong>never</strong> used to
                  train, fine-tune, or test machine learning or generative AI models.
                </p>
              </div>

              <div className="trust-card">
                <div className="trust-card-icon green">
                  <UserCheck size={26} />
                </div>
                <h3>100% Content Sovereignty</h3>
                <p>
                  You retain absolute copyright, intellectual property, and ownership over both input
                  and output files. We claim zero rights or licenses.
                </p>
              </div>

              <div className="trust-card">
                <div className="trust-card-icon red">
                  <Trash2 size={26} />
                </div>
                <h3>Ephemeral by Design</h3>
                <p>
                  We adhere to strict data minimization. Files exist strictly in temporary, isolated
                  sandboxes and are automatically purged within 30 minutes.
                </p>
              </div>
            </div>

            {/* In-Depth Ethical Pillars */}
            <div className="info-card">
              <div className="info-section">
                <div className="section-title-row">
                  <span className="section-num">01</span>
                  <h2>Pledge Against Machine Learning Exploitation</h2>
                </div>
                <p>
                  Many document services quietly repurpose user uploads to train commercial Large Language
                  Models (LLMs) or visual recognition models. C1 Convert takes a firm ethical stand
                  against this practice:
                </p>
                <ul className="info-bullet-list">
                  <li>
                    <CheckCircle2 size={18} className="bullet-icon green" />
                    <span>
                      <strong>No LLM Training:</strong> Uploaded text, legal contracts, proprietary code,
                      or financial data are never fed into training corpora or vector databases.
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="bullet-icon green" />
                    <span>
                      <strong>No Content Indexing:</strong> Files are converted strictly on-demand using
                      isolated local conversion algorithms without content indexing or profiling.
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="bullet-icon green" />
                    <span>
                      <strong>No Data Brokerage:</strong> We do not sell, rent, monetize, or barter your
                      documents or metadata with third-party data aggregators.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="info-section">
                <div className="section-title-row">
                  <span className="section-num">02</span>
                  <h2>Respect for Intellectual Property & Privacy Dignity</h2>
                </div>
                <p>
                  We believe document utility software should respect the author’s creative and legal
                  work. When you use C1 Convert:
                </p>
                <p>
                  Your files belong exclusively to you. Whether converting an academic thesis, a confidential
                  business contract, medical diagnostic records, or family photographs, C1 Convert acts solely
                  as an ephemeral conduit. We do not claim any implied license, derivative work rights, or
                  commercial redistribution permissions.
                </p>
              </div>

              <div className="info-section">
                <div className="section-title-row">
                  <span className="section-num">03</span>
                  <h2>Data Minimization & Automated Erasure (GDPR Art. 5)</h2>
                </div>
                <p>
                  Our architecture is built around the ethical principle of data minimization. We only
                  hold data for the minimum operational window required:
                </p>
                <div className="lifecycle-diagram">
                  <div className="lifecycle-step">
                    <strong>1. Upload</strong>
                    <span>Encrypted in-transit via TLS 1.3</span>
                  </div>
                  <div className="lifecycle-arrow">→</div>
                  <div className="lifecycle-step">
                    <strong>2. Conversion</strong>
                    <span>Isolated sandbox memory execution</span>
                  </div>
                  <div className="lifecycle-arrow">→</div>
                  <div className="lifecycle-step">
                    <strong>3. Ready</strong>
                    <span>Immediate download link provided</span>
                  </div>
                  <div className="lifecycle-arrow">→</div>
                  <div className="lifecycle-step purge">
                    <strong>4. Auto-Purge</strong>
                    <span>Hard deleted after 30 minutes</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="section-title-row">
                  <span className="section-num">04</span>
                  <h2>Harm Prevention & Responsible Use</h2>
                </div>
                <p>
                  While we champion user privacy, we enforce strict zero-tolerance policies against using
                  our automated conversion pipeline for harmful activities. We actively prohibit the
                  processing of:
                </p>
                <ul className="info-bullet-list">
                  <li>Child Sexual Abuse Material (CSAM) or Child Sexual Exploitation and Abuse (CSAE).</li>
                  <li>Non-consensual intimate imagery or cyber-harassment materials.</li>
                  <li>Malware payloads, ransomware droppers, or spyware embedded in document containers.</li>
                  <li>State-sponsored cyber-attacks or denial-of-service weapons.</li>
                </ul>
              </div>

              <div className="info-section">
                <div className="section-title-row">
                  <span className="section-num">05</span>
                  <h2>Honest, Dark-Pattern-Free User Experience</h2>
                </div>
                <p>
                  We reject manipulative web patterns that trick users into paying for unexpected subscriptions,
                  waiting through fake "engine processing" delays, or jumping through deceptive captcha hoops.
                  C1 Convert delivers real conversions, real files, and clean utilities without AI slop or
                  hostage downloads.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            2. PRIVACY POLICY
           ========================================================================= */}
        {kind === 'privacy' && (
          <div className="info-content-fade">
            <div className="info-hero">
              <span className="eyebrow">
                <ShieldCheck size={14} /> PRIVACY & DATA PROTECTION NOTICE
              </span>
              <h1>Privacy Policy</h1>
              <p className="lead">
                Last updated: September 2026. How C1 Convert handles file conversion data with zero
                persistence and rigorous privacy standards.
              </p>
            </div>

            <div className="trust-cards-grid">
              <div className="trust-card">
                <div className="trust-card-icon blue">
                  <Lock size={26} />
                </div>
                <h3>TLS 1.3 Encryption</h3>
                <p>All file transfers are protected with high-grade HTTPS encryption in transit.</p>
              </div>
              <div className="trust-card">
                <div className="trust-card-icon green">
                  <Trash2 size={26} />
                </div>
                <h3>30-Minute Auto-Purge</h3>
                <p>Files are assigned randomized cryptographic UUIDs and purged after 30 minutes.</p>
              </div>
              <div className="trust-card">
                <div className="trust-card-icon red">
                  <EyeOff size={26} />
                </div>
                <h3>No Account Required</h3>
                <p>We do not collect names, passwords, credit card numbers, or invasive telemetry.</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-section">
                <h2>1. Information We Collect and Process</h2>
                <p>
                  C1 Convert is designed to minimize data collection at every stage of the user journey:
                </p>
                <ul className="info-bullet-list">
                  <li>
                    <strong>Document Files:</strong> Files you upload (PDFs, DOCX, XLSX, images) are
                    stored temporarily in an isolated server directory solely to execute your requested
                    conversion or utility operation.
                  </li>
                  <li>
                    <strong>Technical & Network Metadata:</strong> When you connect to our service, our
                    servers record standard web connection headers (IP address, browser type, and timestamp)
                    exclusively for rate limiting, security defense, and DDoS mitigation.
                  </li>
                  <li>
                    <strong>No Personal Profile Data:</strong> We do not require accounts, logins, emails,
                    or payment credentials for standard document utilities.
                  </li>
                </ul>
              </div>

              <div className="info-section">
                <h2>2. File Lifecycle & Automatic Deletion</h2>
                <p>
                  When you initiate a conversion:
                </p>
                <ol className="info-numbered-list">
                  <li>The file is assigned an unpredictable random UUID (e.g., <code>f6fd8fc9-...</code>).</li>
                  <li>The conversion engine executes the transformation in an ephemeral sandbox.</li>
                  <li>The resulting output file is placed in a temporary download directory.</li>
                  <li>
                    A background cleanup daemon systematically unlinks and permanently deletes all files
                    after 30 minutes. You may also click &ldquo;Remove file&rdquo; in the interface to discard
                    it immediately.
                  </li>
                </ol>
              </div>

              <div className="info-section">
                <h2>3. Zero Third-Party Sharing & No Ad Trackers</h2>
                <p>
                  We maintain a strict zero-sharing policy:
                </p>
                <ul className="info-bullet-list">
                  <li>We do not sell, rent, trade, or share your document data with advertisers.</li>
                  <li>We do not use invasive third-party cross-site advertising trackers or analytics cookies.</li>
                  <li>
                    Document contents are never processed by external cloud APIs unless explicitly disclosed
                    for a specialized feature.
                  </li>
                </ul>
              </div>

              <div className="info-section">
                <h2>4. Cookies & Local Storage</h2>
                <p>
                  C1 Convert does not use advertising or tracking cookies. We only use browser{' '}
                  <code>localStorage</code> to remember your theme selection (<code>light</code> or{' '}
                  <code>dark</code> mode) so that your visual preferences persist across sessions.
                </p>
              </div>

              <div className="info-section">
                <h2>5. Your Rights Under GDPR & CCPA/CPRA</h2>
                <p>
                  Depending on your jurisdiction (including the European Union under GDPR and California
                  under CCPA/CPRA), you have fundamental rights:
                </p>
                <ul className="info-bullet-list">
                  <li><strong>Right to Erasure:</strong> Files are automatically deleted within 30 minutes.</li>
                  <li><strong>Right of Access:</strong> We store no personal accounts or profile histories.</li>
                  <li><strong>Right to Non-Discrimination:</strong> Full access to all tools without bias.</li>
                </ul>
              </div>

              <div className="info-section">
                <h2>6. Security Inquiries</h2>
                <p>
                  If you have questions regarding this Privacy Policy or wish to report a security concern,
                  you can reach out via our GitHub repository or contact our team directly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            3. TERMS OF SERVICE
           ========================================================================= */}
        {kind === 'terms' && (
          <div className="info-content-fade">
            <div className="info-hero">
              <span className="eyebrow">
                <Scale size={14} /> FAIR USE & LEGAL TERMS
              </span>
              <h1>Terms of Service</h1>
              <p className="lead">
                Last updated: September 2026. The clear, fair terms that govern your use of C1 Convert.
              </p>
            </div>

            <div className="trust-cards-grid">
              <div className="trust-card">
                <div className="trust-card-icon blue">
                  <FileCheck size={26} />
                </div>
                <h3>Fair & Free Use</h3>
                <p>Open for individuals, students, creators, and businesses for everyday file conversions.</p>
              </div>
              <div className="trust-card">
                <div className="trust-card-icon green">
                  <UserCheck size={26} />
                </div>
                <h3>Your Files, Your Rights</h3>
                <p>You retain 100% intellectual property ownership of your files. We claim zero rights.</p>
              </div>
              <div className="trust-card">
                <div className="trust-card-icon red">
                  <ShieldCheck size={26} />
                </div>
                <h3>Safe & Lawful Conduct</h3>
                <p>Prohibiting malware, abusive automation, copyright theft, or illegal content distribution.</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or utilizing C1 Convert, you confirm that you have read, understood, and agreed
                  to be bound by these Terms of Service. If you disagree with any part of these terms, please
                  discontinue use of our application.
                </p>
              </div>

              <div className="info-section">
                <h2>2. Permitted Use & Service Purpose</h2>
                <p>
                  C1 Convert is provided as a self-service utility for converting, compressing, and editing
                  everyday document formats (PDF, DOCX, XLSX, JPG, PNG). You may use this service for personal,
                  academic, commercial, and professional document handling within reasonable fair use limits.
                </p>
              </div>

              <div className="info-section">
                <h2>3. User Responsibilities & Content Representations</h2>
                <p>
                  When uploading and converting files via C1 Convert, you represent and warrant that:
                </p>
                <ul className="info-bullet-list">
                  <li>
                    You own the file or possess the requisite legal authorization, rights, or licenses to convert
                    and manipulate the document.
                  </li>
                  <li>
                    Your files do not infringe upon the intellectual property rights, privacy rights, or copyrights
                    of any third party.
                  </li>
                  <li>
                    You will not upload documents containing malware, trojans, malicious macros, worms, or software
                    designed to compromise our systems or other users.
                  </li>
                </ul>
              </div>

              <div className="info-section">
                <h2>4. Prohibited Uses</h2>
                <p>
                  You agree not to engage in any of the following unauthorized activities:
                </p>
                <ul className="info-bullet-list">
                  <li>Attempting to probe, scan, or breach the vulnerability of our servers, networks, or endpoints.</li>
                  <li>Deploying automated scrapers, flood bots, or high-volume denial-of-service scripts.</li>
                  <li>Using the service to store, convert, or distribute illegal or prohibited content.</li>
                  <li>Circumventing rate limits, file size caps, or operational safeguards.</li>
                </ul>
              </div>

              <div className="info-section">
                <h2>5. Disclaimer of Warranties & Limitation of Liability</h2>
                <p>
                  C1 Convert is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without
                  warranties of any kind, whether express or implied.
                </p>
                <p>
                  While our engines strive for maximum layout fidelity and formatting accuracy, file conversions
                  involve complex algorithmic approximations. We strongly advise users to retain backup copies
                  of all original files and verify output formatting before critical deployment. Under no
                  circumstances shall C1 Convert or its operators be liable for indirect, incidental, or
                  consequential damages resulting from document conversions.
                </p>
              </div>

              <div className="info-section">
                <h2>6. Modifications to Terms</h2>
                <p>
                  We may periodically revise these Terms of Service to reflect evolving features, operational
                  needs, or regulatory requirements. Continued use of C1 Convert after updates constitutes your
                  acceptance of the modified terms.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
