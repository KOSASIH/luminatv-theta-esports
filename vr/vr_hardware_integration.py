import pygame
import OpenVR

class VRHardwareIntegration:
    def __init__(self):
        self.init_vr()

    def init_vr(self):
        self.vr_system = OpenVR.System()
        self.hmd = self.vr_system.GetHmd()
        self.hmd_desc = self.hmd.GetDesc()
        self.left_controller = self.vr_system.GetController(0)
        self.right_controller = self.vr_system.GetController(1)

    def get_hmd_pose(self):
        return self.hmd.GetPose()

    def get_left_controller_pose(self):
        return self.left_controller.GetPose()

    def get_right_controller_pose(self):
        return self.right_controller.GetPose()

    def get_hmd_pose_matrix(self):
        pose = self.get_hmd_pose()
        return pose.mDeviceToAbsoluteTracking

    def get_left_controller_pose_matrix(self):
        pose = self.get_left_controller_pose()
        return pose.mDeviceToAbsoluteTracking

    def get_right_controller_pose_matrix(self):
        pose = self.get_right_controller_pose()
        return pose.mDeviceToAbsoluteTracking

    def run(self):
        pygame.init()
        screen = pygame.display.set_mode((self.hmd_desc.resolution.w, self.hmd_desc.resolution.h), pygame.OPENGL | pygame.DOUBLEBUF)
        glViewport(0, 0, self.hmd_desc.resolution.w, self.hmd_desc.resolution.h)
        clock = pygame.time.Clock()
        simulation = VRSimulation(self.hmd_desc.resolution.w, self.hmd_desc.resolution.h)
        obj = VRObject(
            vertices=np.array([
                -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0
            ], dtype=np.float32),
            colors=np.array([
                1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0
            ], dtype=np.float32),
            texture_coords=np.array([
                0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
            ], dtype=np.float32)
        )
        simulation.add_object(obj)
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    return
            glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
            glLoadIdentity()
            hmd_pose_matrix = self.get_hmd_pose_matrix()
            glMultMatrixf(hmd_pose_matrix)
            simulation.update()
            simulation.render()
            pygame.display.flip()
            clock.tick(60)

if __name__ == "__main__":
    vr_integration = VRHardwareIntegration()
    vr_integration.run()
