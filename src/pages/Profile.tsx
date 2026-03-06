import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SyllabLogo } from "@/components/SyllabLogo";
import { BookOpen, Bell, Calendar, GraduationCap, FlaskConical, Moon } from "lucide-react";
import profilePic from "@/assets/amy-wu-profile.jpg";

const Profile = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationMethod, setNotificationMethod] = useState<"email" | "sms">("email");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notificationTiming, setNotificationTiming] = useState("1-day");
  const [showAssignments, setShowAssignments] = useState(true);
  const [showExams, setShowExams] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showOfficeHours, setShowOfficeHours] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur-md px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <SyllabLogo className="h-6 text-lg" />
          <h1 className="text-lg font-bold text-foreground">Profile</h1>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-5 space-y-5">
        {/* Student Info */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border bg-card p-5"
        >
          <div className="flex items-center gap-4">
            <img
              src={profilePic}
              alt="Amy Wu"
              className="h-16 w-16 rounded-full object-cover border-2 border-primary/20"
            />
            <div>
              <h2 className="text-base font-semibold text-foreground">Amy Wu</h2>
              <p className="text-sm text-muted-foreground">wuamy@mit.edu</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3">
              <GraduationCap className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">MIT Sloan MBAn Student</p>
                <p className="text-xs text-muted-foreground">Master of Business Analytics</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BookOpen className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">5 courses per term</p>
                <p className="text-xs text-muted-foreground">1-year program</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FlaskConical className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Faculty Research</p>
                <p className="text-xs text-muted-foreground">Participating in faculty research</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <Badge variant="outline" className="text-[10px] rounded-full">15.785</Badge>
            <Badge variant="outline" className="text-[10px] rounded-full">15.089</Badge>
            <Badge variant="outline" className="text-[10px] rounded-full">6.S899</Badge>
            <Badge variant="outline" className="text-[10px] rounded-full">15.900</Badge>
          </div>
        </motion.div>

        {/* Appearance / Dark Mode */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-xl border bg-card p-5 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Appearance</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Use a dark theme for the app</p>
            </div>
            <Switch
              checked={resolvedTheme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border bg-card p-5 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Get reminded about deadlines</p>
            </div>
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>

          {notificationsEnabled && (
            <>
              <div className="space-y-2">
                <p className="text-xs font-medium text-foreground">Notify me by</p>
                <RadioGroup
                  value={notificationMethod}
                  onValueChange={(v) => setNotificationMethod(v as "email" | "sms")}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="notify-email" />
                    <Label htmlFor="notify-email" className="text-sm font-normal cursor-pointer">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sms" id="notify-sms" />
                    <Label htmlFor="notify-sms" className="text-sm font-normal cursor-pointer">
                      Text message
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {notificationMethod === "sms" && (
                <div className="space-y-2">
                  <Label htmlFor="phone-number" className="text-xs font-medium text-foreground">
                    Phone number
                  </Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              )}
              <div className="space-y-2">
                <p className="text-xs font-medium text-foreground">Reminder Timing</p>
                <Select value={notificationTiming} onValueChange={setNotificationTiming}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-hour">1 hour before</SelectItem>
                    <SelectItem value="3-hours">3 hours before</SelectItem>
                    <SelectItem value="1-day">1 day before</SelectItem>
                    <SelectItem value="2-days">2 days before</SelectItem>
                    <SelectItem value="1-week">1 week before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </motion.div>

        {/* Calendar Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border bg-card p-5 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Calendar Preferences</h3>
          </div>

          <p className="text-xs text-muted-foreground">Choose what shows up on your calendar</p>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground">Assignments & Problem Sets</p>
              <Switch checked={showAssignments} onCheckedChange={setShowAssignments} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground">Exams</p>
              <Switch checked={showExams} onCheckedChange={setShowExams} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground">Projects & Presentations</p>
              <Switch checked={showProjects} onCheckedChange={setShowProjects} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground">Office Hours</p>
              <Switch checked={showOfficeHours} onCheckedChange={setShowOfficeHours} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
