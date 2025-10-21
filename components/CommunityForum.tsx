// components/CommunityForum.tsx
"use client";

import React, { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, MessageCircle, Plus, Trash2, ArrowUp, Users } from "lucide-react";

type Thread = {
  id: string;
  title: string;
  body: string;
  author: string;
  dateISO: string;
  replies: number;
};

const SAMPLE_THREADS: Thread[] = [
  {
    id: "t1",
    title: "Best season for Mount Kenya summit?",
    body: "I'm planning in July — any advice on road conditions and packing?",
    author: "Njeri",
    dateISO: "2024-08-01T09:00:00.000Z",
    replies: 12,
  },
  {
    id: "t2",
    title: "Lightweight tents that handle wind",
    body: "Which tent models have you used on the Aberdares? I need something for high winds.",
    author: "Sam",
    dateISO: "2024-07-22T14:30:00.000Z",
    replies: 4,
  },
  {
    id: "t3",
    title: "M-Pesa payment experience — tips?",
    body: "Looking to pay deposit for a group trip. How do you confirm transaction receipts?",
    author: "Grace",
    dateISO: "2024-06-11T18:20:00.000Z",
    replies: 6,
  },
];

export const CommunityForum: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>(SAMPLE_THREADS);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // animate on mount and when threads change
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current?.children;
      if (!items || items.length === 0) return;
      gsap.fromTo(
        items,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
      );
    }, listRef);

    return () => ctx.revert();
  }, [threads.length]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !author.trim()) return;

    const newThread: Thread = {
      id: `t_${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      author: author.trim(),
      dateISO: new Date().toISOString(),
      replies: 0,
    };

    setThreads((prev) => [newThread, ...prev]);
    setTitle("");
    setBody("");
    setAuthor("");

    // Animate form reset
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { scale: 0.98 },
        { scale: 1, duration: 0.3, ease: "back.out(1.2)" }
      );
    }
  };

  const handleClear = () => {
    if (!confirm("Clear all forum threads? This cannot be undone.")) return;
    setThreads([]);
  };

  const formatDate = (iso: string) => {
    try {
      const dt = new Date(iso);
      return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return iso;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header Section with Enhanced Styling */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-12 pb-8 border-b-4 border-gradient-to-r from-accent/40 via-primary/40 to-accent/40">
          <div className="flex-1">
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-accent/10 rounded-full border-2 border-accent/30">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Community Hub</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent mb-3">
              Community Forum
            </h2>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary rounded-full" />
              <div className="w-2 h-2 bg-accent rounded-full" />
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </div>
            
            <p className="text-base text-muted-foreground max-w-xl leading-relaxed px-4 py-3 bg-muted/30 rounded-xl border-l-4 border-accent/50">
              Ask questions, share trip reports, and connect with other hikers. Your community is a message away.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="border-2 border-primary/40 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to top
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleClear}
              className="border-2 border-destructive/40 hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Threads
            </Button>
          </div>
        </div>

        {/* Enhanced Form Section */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="mb-12 bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl p-8 shadow-xl border-4 border-accent/30 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-accent/20">
            <div className="p-2 bg-accent/20 rounded-lg border-2 border-accent/40">
              <Plus className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">Start a New Thread</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-muted-foreground mb-2 ml-1">
                Your Name
              </label>
              <input
                aria-label="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name"
                className="input w-full px-4 py-3 bg-background border-2 border-accent/30 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-muted-foreground mb-2 ml-1">
                Thread Title
              </label>
              <input
                aria-label="Thread title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your question or topic?"
                className="input w-full px-4 py-3 bg-background border-2 border-accent/30 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-muted-foreground mb-2 ml-1">
              Your Message
            </label>
            <textarea
              aria-label="Thread body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your thoughts, questions, or experiences..."
              className="textarea w-full h-32 px-4 py-3 bg-background border-2 border-accent/30 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-accent/20">
            <Button 
              type="submit" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 px-6 py-3 border-2 border-accent shadow-lg hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              Post Thread
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => { setTitle(""); setBody(""); setAuthor(""); }}
              className="border-2 border-muted-foreground/30 hover:bg-muted transition-all duration-300"
            >
              Cancel
            </Button>
            
            <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border-2 border-primary/30">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">{threads.length}</span>
              <span className="text-sm text-muted-foreground">threads</span>
            </div>
          </div>
        </form>

        {/* Enhanced Thread List */}
        <div ref={listRef} className="space-y-6">
          {threads.length === 0 ? (
            <div className="p-12 bg-gradient-to-br from-muted/40 via-muted/30 to-accent/10 rounded-2xl text-center border-4 border-dashed border-muted-foreground/20">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
              <p className="text-base text-muted-foreground font-medium">
                No threads yet — be the first to start the conversation!
              </p>
            </div>
          ) : (
            threads.map((t) => (
              <article 
                key={t.id} 
                className="group bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 border-2 border-accent/20 hover:border-accent/40 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar with Border */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border-3 border-accent/40 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <User className="h-7 w-7 text-accent" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300 border-l-4 border-accent/50 pl-3">
                        {t.title}
                      </h3>
                      <div className="px-3 py-1 bg-muted/50 rounded-lg border border-accent/20 text-xs text-muted-foreground font-medium">
                        {formatDate(t.dateISO)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 px-4 py-3 bg-muted/20 rounded-lg border-l-2 border-accent/30">
                      {t.body}
                    </p>

                    {/* Meta Info with Borders */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-accent/10">
                      <Badge className="bg-accent/20 text-accent border-2 border-accent/40 font-semibold px-3 py-1">
                        {t.author}
                      </Badge>
                      
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/30">
                        <MessageCircle className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-primary">{t.replies}</span>
                        <span className="text-xs text-muted-foreground">replies</span>
                      </div>
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setThreads((prev) => 
                            prev.map((x) => (x.id === t.id ? { ...x, replies: x.replies + 1 } : x))
                          );
                        }}
                        className="ml-auto border-2 border-accent/40 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunityForum;