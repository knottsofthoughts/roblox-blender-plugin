import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Bug,
  CalendarCheck2,
  Laugh,
  Brain,
  Users,
  ClipboardList,
  Settings,
  Code2,
  FileText,
  ShieldCheck,
  Store,
  PenTool,
  RefreshCw,
  CheckCircle,
  Pause,
  StopCircle,
  PlusCircle,
  Trash2,
  Edit3,
  MessageSquareHeart
} from 'lucide-react';

// Demonstration component extracted from ChatGPT discussion.
// This file is not used by the Blender plugin. It simply provides an
// example React dashboard showcasing task management, writer activation,
// and an approval queue.  It can be copied into a React project if desired.

const initialStaff = [
  {
    name: 'Prompt Daddy Max',
    title: 'GPT Prompt Master Specialist',
    quirk: 'Writes prompts so precise they make GPT weep with joy',
    icon: <Brain className="w-6 h-6 text-fuchsia-500" />,
    points: 95,
    active: false
  },
  {
    name: 'Manny Manager',
    title: "Managers' Manager",
    quirk: 'Keeps the entire squad accountable with calendar reminders and just enough sarcasm',
    icon: <Users className="w-6 h-6 text-teal-500" />,
    points: 98,
    active: false
  },
  {
    name: 'Funnelicious Rex',
    title: 'Quiz & Funnel Strategist',
    quirk: 'Builds quizzes that feel like games and funnels that close like charm spells',
    icon: <ClipboardList className="w-6 h-6 text-indigo-600" />,
    points: 90,
    active: false
  },
  {
    name: 'Scriptoria Ink',
    title: 'Content Research Writer',
    quirk: 'Tracks praise, receipts, shady behavior, and glowing reviews like a forensic linguist on a mission',
    icon: <PenTool className="w-6 h-6 text-amber-500" />,
    points: 86,
    active: false
  },
  {
    name: 'Ghosty Draftz',
    title: 'Content Writer + Intern Handler',
    quirk: 'Edits everything at 3AM with lo-fi beats and red wine',
    icon: <PenTool className="w-6 h-6 text-emerald-500" />,
    points: 88,
    active: false
  },
  {
    name: 'Receipta Queen',
    title: 'Chief Evidence Officer & PI-Level Investigator',
    quirk: "Keeps every receipt and compliments like it's emotional gold",
    icon: <MessageSquareHeart className="w-6 h-6 text-rose-400" />,
    points: 99,
    active: false
  }
];

const initialTasks = [
  {
    id: 5,
    title: 'Design $33,000/month profit funnel with tripwire + high-ticket upsell',
    status: 'active',
    assignedTo: 'Funnelicious Rex'
  },
  {
    id: 6,
    title: 'Map Drip Email Series for Funnel ($33k strategy)',
    status: 'active',
    assignedTo: 'Funnelicious Rex'
  },
  {
    id: 3,
    title: 'Build opt-in quiz for lead magnet',
    status: 'active',
    assignedTo: 'Funnelicious Rex'
  },
  {
    id: 4,
    title: 'Design sales funnel for $97 digital product',
    status: 'active',
    assignedTo: 'Funnelicious Rex'
  },
  { id: 1, title: 'Schedule post for approval', status: 'active' },
  { id: 2, title: 'Collect testimony for course feedback', status: 'paused' }
];

export default function SassistanceUnitDashboard() {
  const [staff, setStaff] = useState(initialStaff);
  const [selected, setSelected] = useState(null);
  const [activatedWriters, setActivatedWriters] = useState({});
  const [search, setSearch] = useState('');
  const [refreshTime, setRefreshTime] = useState(60);
  const [approvalQueue, setApprovalQueue] = useState([]);
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTime(prev => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleWriterAccess = name => {
    setActivatedWriters(prev => {
      const updated = { ...prev, [name]: !prev[name] };
      if (updated[name]) {
        const writer = staff.find(member => member.name === name);
        setApprovalQueue(q => (q.some(w => w.name === name) ? q : [...q, writer]));
      } else {
        setApprovalQueue(q => q.filter(w => w.name !== name));
      }
      return updated;
    });
  };

  const handleRefresh = () => setRefreshTime(60);

  const approveContent = name => {
    setApprovalQueue(prev => prev.filter(item => item.name !== name));
    alert(`Content by ${name} approved and ready for publishing!`);
  };

  const updateTaskStatus = (id, status) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, status } : t)));
  };

  const addTask = () => {
    const title = prompt('Enter new task');
    if (title) {
      setTasks(prev => [
        ...prev,
        { id: Date.now(), title, status: 'active' }
      ]);
    }
  };

  const removeTask = id => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search Sassistance Unit..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm"
        />
        <Button
          variant="ghost"
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
          Refresh ({refreshTime}s)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff
          .filter(
            member =>
              member.name.toLowerCase().includes(search.toLowerCase()) ||
              member.title.toLowerCase().includes(search.toLowerCase())
          )
          .map(member => (
            <Card
              key={member.name}
              className="rounded-2xl shadow-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  {member.icon}
                </div>
                <p className="text-sm italic text-gray-300">{member.title}</p>
                <p className="text-sm">\u{1F4A1} {member.quirk}</p>
                <Progress value={member.points} className="mt-3" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm">\u{26A1} {member.points} Sass Points</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="text-xs"
                      onClick={() => setSelected(member)}
                    >
                      Details
                    </Button>
                    {member.title.includes('Writer') && (
                      <Button
                        variant="outline"
                        className={`text-xs ${
                          activatedWriters[member.name]
                            ? 'border-green-500'
                            : 'border-gray-400'
                        }`}
                        onClick={() => toggleWriterAccess(member.name)}
                      >
                        {activatedWriters[member.name] ? 'Revoke Access' : 'Activate'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">\u{1F5C2}\u{FE0F} Task Board</h3>
          <Button size="sm" onClick={addTask}>
            <PlusCircle className="w-4 h-4 mr-1" /> Add Task
          </Button>
        </div>
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-2"
          >
            <span>{task.title}</span>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => updateTaskStatus(task.id, 'paused')}
              >
                <Pause className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => updateTaskStatus(task.id, 'stopped')}
              >
                <StopCircle className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => removeTask(task.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {approvalQueue.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-bold mb-2">Approval Queue</h3>
          {approvalQueue.map(writer => (
            <div
              key={writer.name}
              className="flex items-center justify-between p-2 bg-white rounded-md mb-2"
            >
              <span>
                {writer.name} - {writer.title}
              </span>
              <Button
                variant="success"
                size="sm"
                onClick={() => approveContent(writer.name)}
              >
                <CheckCircle className="w-4 h-4 mr-1" /> Approve
              </Button>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold">{selected.name}</h2>
            <p className="font-semibold">{selected.title}</p>
            <p>\u{1F4AC} Quirk: {selected.quirk}</p>
            <p>\u{26A1} Sass Points: {selected.points}</p>
            <Button onClick={() => setSelected(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}

