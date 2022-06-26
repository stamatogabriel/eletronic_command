import crypto from 'crypto';
import { HmacSHA512 } from 'crypto-js';

import { Address } from '../../shared/interfaces/address';

export enum Role {
  User = 'user',
  Admin = 'admin',
  Client = 'client',
}

export type UserProps = {
  avatar?: string;
  address?: Address[];
  name: string;
  roles: Role[];
  email: string;
  phone: string;
  password: string;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
};

function HashPass(pass: string) {
  const hashPassword = HmacSHA512(pass, process.env.PASSWORD_SALT).toString();
  return hashPassword;
}

export class User {
  public readonly id: string;
  public props: Required<UserProps>;

  constructor(props: UserProps, id?: string) {
    this.id = id || crypto.randomUUID();
    this.props = {
      ...props,
      avatar: props.avatar || '',
      address: props.address || [],
      passwordResetExpires: props.passwordResetExpires || null,
      passwordResetToken: props.passwordResetToken || null,
    };
  }

  static create(props: UserProps, id?: string) {
    props = { ...props, password: HashPass(props.password) };

    return new User(props, id);
  }

  static update(props: UserProps, id?: string) {
    const user = new User(props, id);

    if (props.avatar) {
      user.updateAvatar(props.avatar);
    }

    if (props.roles) {
      user.updateUserRoles(props.roles);
    }

    if (props.password) {
      user.updatePassword(props.password);
    }

    if (props.address) {
      user.updateUserAddress(props.address);
    }

    if (props.name || props.phone || props.email) {
      user.updateUserData(props.name, props.phone, props.email);
    }

    return user;
  }

  updateAvatar(avatar: string) {
    this.avatar = avatar;
  }

  updateUserData(name?: string, phone?: string, email?: string) {
    this.name = name || this.name;
    this.phone = phone || this.phone;
    this.email = email || this.email;
  }

  updateUserAddress(address: Address[]) {
    this.address = address;
  }

  updateUserRoles(roles: Role[]) {
    this.roles = roles;
  }

  updatePassword(password: string) {
    this.password = HashPass(password);
  }

  get avatar() {
    return this.props.avatar;
  }

  private set avatar(avatar: string) {
    this.props.avatar = avatar;
  }

  get name() {
    return this.props.name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  private set email(email: string) {
    this.props.email = email;
  }

  get phone() {
    return this.props.phone;
  }

  private set phone(phone: string) {
    this.props.phone = phone;
  }

  get address() {
    return this.props.address;
  }

  private set address(address: Address[]) {
    this.props.address = address;
  }

  get roles() {
    return this.props.roles;
  }

  private set roles(roles: Role[]) {
    this.props.roles = roles;
  }

  get password() {
    return this.props.password;
  }

  private set password(password: string) {
    this.props.password = password;
  }

  get passwordResetToken() {
    return this.props.passwordResetToken;
  }

  private set passwordResetToken(passwordResetToken: string) {
    this.props.passwordResetToken = passwordResetToken;
  }

  get passwordResetExpires() {
    return this.props.passwordResetExpires;
  }

  private set passwordResetExpires(passwordResetExpires: Date) {
    this.props.passwordResetExpires = passwordResetExpires;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
