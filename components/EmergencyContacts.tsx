"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z, ZodError } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Plus, Edit, Trash2, Phone } from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  relationship: z
    .string()
    .trim()
    .min(1, "Relationship is required")
    .max(50, "Relationship must be less than 50 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(20, "Phone number must be less than 20 characters"),
});

let mockContactsDB: any[] = [];

export const EmergencyContacts = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch contacts
  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return mockContactsDB;
    },
  });

  // Add / Update / Delete
  const mutation = useMutation({
    mutationFn: async (action: {
      type: "add" | "update" | "delete";
      data?: any;
      id?: number;
    }) => {
      await new Promise((r) => setTimeout(r, 200));
      if (action.type === "add")
        mockContactsDB.push({ id: Math.random(), ...action.data });
      if (action.type === "update")
        mockContactsDB = mockContactsDB.map((c) =>
          c.id === action.id ? { ...c, ...action.data } : c
        );
      if (action.type === "delete")
        mockContactsDB = mockContactsDB.filter((c) => c.id !== action.id);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setIsModalOpen(false);
      const messages = {
        add: ["Contact Added", "Emergency contact added successfully."],
        update: ["Contact Updated", "Emergency contact updated successfully."],
        delete: ["Contact Deleted", "Emergency contact removed."],
      };
      const [title, description] = messages[variables.type];
      variables.type === "delete"
        ? toast.error(title, { description })
        : toast.success(title, { description });
    },
  });

  // Form helpers
  const resetForm = () => {
    setFormData({ name: "", relationship: "", phone: "" });
    setErrors({});
    setEditingId(null);
  };

  const openModal = (contact?: any) => {
    if (contact) {
      setEditingId(contact.id);
      setFormData(contact);
    } else resetForm();
    setIsModalOpen(true);
  };

  const saveContact = () => {
    try {
      const valid = contactSchema.parse(formData);
      mutation.mutate(
        editingId
          ? { type: "update", id: editingId, data: valid }
          : { type: "add", data: valid }
      );
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((i) => {
          if (i.path[0]) fieldErrors[i.path[0].toString()] = i.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  const deleteContact = (id: number) => mutation.mutate({ type: "delete", id });

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <CardHeader className="flex justify-between items-start">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" /> Emergency Contacts
          </CardTitle>
          <CardDescription>
            Contacts notified in case of an emergency during your trip.
          </CardDescription>
        </div>
        <Button onClick={() => openModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Contact
        </Button>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-center text-muted-foreground py-6">
            Loading contacts...
          </p>
        ) : contacts.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="relative p-5 rounded-lg border hover:shadow-md transition"
              >
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openModal(c)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteContact(c.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <h4 className="font-semibold text-lg">{c.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {c.relationship}
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{c.phone}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No emergency contacts yet.</p>
            <p className="text-sm mt-1">
              Add your first contact to get started.
            </p>
          </div>
        )}
      </CardContent>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Contact" : "Add Contact"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the details below."
                : "Fill in the contact details."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {["name", "relationship", "phone"].map((field) => (
              <div key={field} className="grid gap-2">
                <Label htmlFor={field}>
                  {field[0].toUpperCase() + field.slice(1)} *
                </Label>

                {field === "relationship" ? (
                  <Select
                    value={formData.relationship}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, relationship: value });
                      setErrors({ ...errors, relationship: "" });
                    }}
                  >
                    <SelectTrigger
                      id="relationship"
                      className={
                        errors.relationship ? "border-destructive" : ""
                      }
                    >
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="brother">Brother</SelectItem>
                      <SelectItem value="sister">Sister</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => {
                      setFormData({ ...formData, [field]: e.target.value });
                      setErrors({ ...errors, [field]: "" });
                    }}
                    className={errors[field] ? "border-destructive" : ""}
                  />
                )}

                {errors[field] && (
                  <p className="text-sm text-destructive">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveContact}>
              {editingId ? "Save Changes" : "Add Contact"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
