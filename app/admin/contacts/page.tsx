import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

async function getContacts() {
  try {
    await connectDB();
    return await Contact.find({}).sort({ createdAt: -1 });
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    return [];
  }
}

export default async function AdminContactsPage() {
  const contacts = await getContacts();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-accent">Contact Messages</h1>
        <p className="text-sm text-neutral-400 mt-2">{contacts.length} total messages</p>
      </div>

      {contacts.length === 0 ? (
        <div className="glass-panel p-12 text-center">
          <p className="text-neutral-400">No contact messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact: any) => (
            <div
              key={contact._id?.toString() || contact.id}
              className={`glass-panel p-6 ${!contact.read ? "border-l-4 border-accent" : ""}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-display text-lg font-semibold text-neutral-100">
                    {contact.name}
                  </h2>
                  <p className="text-sm text-neutral-400">{contact.email}</p>
                </div>
                <div className="text-xs text-neutral-500">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="mb-2">
                <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">
                  {contact.subject}
                </span>
              </div>
              <p className="text-sm text-neutral-300 mt-3">{contact.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

