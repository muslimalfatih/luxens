import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
import { KeyboardIcon } from 'lucide-react'
import { EditableExif } from '../../types/exif'

interface EditDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editableExif: EditableExif
  setEditableExif: React.Dispatch<React.SetStateAction<EditableExif>>
  onSave: () => void
}

export function EditDrawer({ open, onOpenChange, editableExif, setEditableExif, onSave }: EditDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-sm text-neutral-400 hover:text-neutral-100 hover:border hover:border-neutral-100 hover:bg-transparent"
        >
          <KeyboardIcon className="w-4 h-4" />
          Edit Details
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Photo Details</DrawerTitle>
          <DrawerDescription>
            Make changes to your photo information below.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Device</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md mt-1"
                value={editableExif.device.model}
                onChange={(e) => setEditableExif((prev: EditableExif) => ({
                  ...prev,
                  device: { ...prev.device, model: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Aperture</label>
              <input 
                type="text"
                className="w-full p-2 border rounded-md mt-1"
                value={editableExif.camera.aperture}
                onChange={(e) => setEditableExif((prev: EditableExif) => ({
                  ...prev,
                  camera: { ...prev.camera, aperture: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Shutter Speed</label>
              <input 
                type="text"
                className="w-full p-2 border rounded-md mt-1"
                value={editableExif.camera.shutterSpeed}
                onChange={(e) => setEditableExif((prev: EditableExif) => ({
                  ...prev,
                  camera: { ...prev.camera, shutterSpeed: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">ISO</label>
              <input 
                type="text"
                className="w-full p-2 border rounded-md mt-1"
                value={editableExif.camera.iso}
                onChange={(e) => setEditableExif((prev: EditableExif) => ({
                  ...prev,
                  camera: { ...prev.camera, iso: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Focal Length</label>
              <input 
                type="text"
                className="w-full p-2 border rounded-md mt-1"
                value={editableExif.camera.focalLength}
                onChange={(e) => setEditableExif((prev: EditableExif) => ({
                  ...prev,
                  camera: { ...prev.camera, focalLength: e.target.value }
                }))}
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={onSave}>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
} 